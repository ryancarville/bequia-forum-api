const express = require("express");
const path = require("path");
const SignUpService = require("./signUp-service");
const signUpRouter = express.Router();
//sign up router
signUpRouter
  //post new user creds to db
  .post("/", (req, res, next) => {
    const db = req.app.get("db");
    const { first_name, last_name, email, user_name, password } = req.body;
    for (const feild of [
      "first_name",
      "last_name",
      "email",
      "user_name",
      "password"
    ])
      if (!req.body[feild]) {
        return res.status(400).json({
          error: `Must contain ${feild} in request body.`
        });
      }
    const passwordError = SignUpService.validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    SignUpService.hasUserWithUserName(db, user_name)
      .then(hasUserWithEmail => {
        if (hasUserWithEmail) {
          return res.status(400).json({ error: "User Name is already taken." });
        }
        return SignUpService.hashPassword(password).then(hashedPassword => {
          const newUser = {
            first_name,
            last_name,
            email,
            user_name,
            password: hashedPassword,
            date_created: "now()"
          };
          return SignUpService.insertUser(db, newUser).then(user => {
            return res
              .status(201)
              .location(path.posix.join("/user", `${user.id}`))
              .json(SignUpService.serializeUser(user));
          });
        });
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  });
module.exports = signUpRouter;
