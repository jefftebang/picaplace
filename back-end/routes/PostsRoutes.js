const express = require("express");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const addressToCoordinates = require("../extras/location");
const PostRouter = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

// POSTget
PostRouter.get("/:pid", async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch {
    const error = new Error("Post not found.");
    error.code = 500;
    return next(error);
  }

  if (!post) {
    const error = new Error("Post not found for the given id.");
    error.code = 404;
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
});

// POSTget
PostRouter.get("/user/:uid", async (req, res, next) => {
  const userId = req.params.uid;
  let userWithPosts;
  try {
    userWithPosts = await Post.find({ creator: userId }).populate("posts");

    if (!userWithPosts || userWithPosts.length === 0) {
      const error = new Error("Post not found for the given user id.");
      error.code = 404;
      return next(error);
    }
    res.status(200).json(userWithPosts);
  } catch (err) {
    const error = new Error("Loading posts failed.");
    error.code = 500;
    return next(error);
  }
});

// POSTpost
PostRouter.post(
  "/",
  [check("address").not().isEmpty(), check("description").isLength({ min: 1 })],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Please enter valid data.");
      error.code = 422;
      return next(error);
    }

    const { address, description, creator } = req.body;

    let coordinates;
    try {
      coordinates = await addressToCoordinates(address);
    } catch (error) {
      return next(error);
    }

    const createdPost = new Post({
      address,
      description,
      location: coordinates,
      image: "https://picsum.photos/seed/picsum/200/300",
      creator,
    });

    let user;
    try {
      user = await User.findById(creator);
    } catch (err) {
      const error = new Error("Post creation failed.");
      error.code = 500;
      return next(error);
    }

    if (!user) {
      const error = new Error("Cannot find user.");
      error.code = 404;
      return next(error);
    }

    try {
      const sess = await mongoose.startSession(); //adjustments all
      sess.startTransaction(); //adjustments all
      await createdPost.save({ session: sess }); //adjustments few
      user.posts.push(createdPost);
      await user.save({ session: sess }); //adjustments all
      await sess.commitTransaction(); //adjustments all
    } catch (err) {
      const error = new Error("Post creation failed.");
      error.code = 500;
      return next(error);
    }

    res.status(201).json({ post: createdPost });
  }
);

// POSTpatch
PostRouter.patch(
  "/:pid",
  [check("description").isLength({ min: 1 })],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Please enter valid data.");
      error.code = 422;
      return next(error);
    }

    const { description } = req.body;
    const postId = req.params.pid;

    let post;
    try {
      post = await Post.findById(postId);
    } catch (err) {
      const error = new Error("Could not update post.");
      error.code = 500;
      return next(error);
    }

    post.description = description;

    try {
      await post.save();
    } catch (err) {
      const error = new Error("Could not update post.");
      error.code = 500;
      return next(error);
    }

    res.status(200).json({ post: post.toObject({ getters: true }) });
  }
);

// POSTdelete
PostRouter.delete("/:pid", async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId).populate("creator");
  } catch (err) {
    const error = new Error("Could not delete post.");
    error.code = 500;
    return next(error);
  }

  if (!post) {
    const error = new Error("Could not find post for this id.");
    error.code = 404;
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new Error("Could not delete post.");
    error.code = 500;
    return next(error);
  }

  res.status(200).json({ message: "Post deleted." });
});

module.exports = PostRouter;
