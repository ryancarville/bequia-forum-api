require("dotenv").config;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const jsonBodyParser = express.json();
const { NODE_ENV, CLIENT_ORIGIN } = require("./config");
const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
//routers
const authRouter = require("./auth/auth-router");
const signUpRouter = require("./signUp/signUp-router");
const usersRouter = require("./users/users-router");
const forumRouter = require("./forum/forum-router");
const commentsRouter = require("./comments/comments-router");
const jobsRouter = require("./jobs/jobs-router");
const eventsRouter = require("./events/events-router");
const rentalsRouter = require("./rentals/rentals-router");
const marketPlaceRouter = require("./marketPlace/marketPlace-router");
const directoryRouter = require("./directory/directory-router");
const calabash = require("./calabash/calabash-router");
app.use(morgan(morganOption));
app.use(cors());
app.options("*", cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, Origin, X-Requested-With"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, GET, OPTIONS, PATCH, POST, PUT"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
app.use(helmet());
app.use(jsonBodyParser);
//paths
app.use("/signUp", signUpRouter);
app.use("/login", authRouter);
app.use("/users", usersRouter);
app.use("/forum", forumRouter);
app.use("/comments", commentsRouter);
app.use("/events", eventsRouter);
app.use("/jobs", jobsRouter);
app.use("/rentals", rentalsRouter);
app.use("/marketPlace", marketPlaceRouter);
app.use("/directory", directoryRouter);
app.use("/calabash", calabash);
app.get("/trash", (res, req, next) => {
  return res.json({ is: "working" });
});
//error handler
app.use(function errorHandler(error, req, res, next) {
  let response;

  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
