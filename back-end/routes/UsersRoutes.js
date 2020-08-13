const express = require("express");
const UsersRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

UsersRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, passwordCheck } = req.body;

    // validation
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Please fill all fields." });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Pleae create password atleast 8 characters." });
    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Password does not match!" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: "Email already exists." });

    if (!name) name = email;

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      image: "https://picsum.photos/200",
      password: passHash,
    });
    const savedUser = await newUser.save();
    res.send().json({
      savedUser,
      user: existingUser.toObject({ getters: true }),
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

UsersRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Please fill all fields." });
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Please enter valid email and password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ msg: "Please enter valid email and password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ err: error.message });
  }
});

UsersRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

UsersRouter.get("/users", async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new Error("Loading users failed.");
    error.code = 500;
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
});

module.exports = UsersRouter;
