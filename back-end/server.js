const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Config for dotenv
require("dotenv").config({
  path: "./config/config.env",
});

// Connec to DB
connectDB();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://picaplace-aa132.web.app"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Config for development only
// if (process.env.NODE_ENV === "development") {
//   app.use(
//     cors({
//       origin: process.env.CLIENT_URL,
//     })
//   );

//   app.use(morgan("dev"));
// }

const postsRoutes = require("./routes/PostsRoutes");
const usersRoutes = require("./routes/UsersRoutes");

// Use Routes
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error." });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
