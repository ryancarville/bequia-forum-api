const express = require("express");
const AuthService = require("./auth-service");
const authRouter = express.Router();

authRouter

  .post("/", (req, res, next) => {
    const { email, user_name, password } = req.body;
    const logInUser = { email, user_name, password };
    for (const [key, value] of Object.entries(logInUser)) {
      if (value == 0) {
        return res.status(40).json({ error: `Please enter a ${key}` });
      }
    }
    if (logInUser.email) {
      AuthService.getUserWithEmail(req.app.get("db"), logInUser.email)
        .then(dbUser => {
          if (!dbUser) {
            return res
              .status(401)
              .json({ error: `Incorrect email address or password` });
          }
          return AuthService.comparePassword(
            logInUser.password,
            dbUser.password
          ).then(compareMatch => {
            if (!compareMatch)
              return res
                .status(401)
                .json({ error: `Incorrect email address or password.` });
            const sub = dbUser.email;
            const payload = { user_id: dbUser.id };
            res.send({
              user_id: dbUser.id,
              authToken: AuthService.createJwt(sub, payload)
            });
          });
        })
        .catch(err => {
          console.log(err);
          next(err);
        });
    }
    if (logInUser.user_name) {
      AuthService.getUserWithUserName(req.app.get("db"), logInUser.user_name)
        .then(dbUser => {
          if (!dbUser) {
            return res
              .status(401)
              .json({ error: `Incorrect email address or password` });
          }
          return AuthService.comparePassword(
            logInUser.password,
            dbUser.password
          ).then(compareMatch => {
            if (!compareMatch)
              return res
                .status(401)
                .json({ error: `Incorrect email address or password.` });
            const sub = dbUser.email;
            const payload = { user_id: dbUser.id };
            res.send({
              user_id: dbUser.id,
              authToken: AuthService.createJwt(sub, payload)
            });
          });
        })
        .catch(err => {
          console.log(err);
          next(err);
        });
    }
  })
  .get("/verifyToken/:token", (req, res, next) => {
    const { token } = req.params;
    if (!token) {
      return res.status(401).json({ error: "Request must contain a token." });
    }
    const verfiy = AuthService.verifyJwt(token);
    console.log(verfiy);
    if (verfiy.message === "jwt expired") {
      return res
        .status(400)
        .json({ error: "Unauthorized Access.  Token has expired." });
    } else {
      return res.send({
        user_id: verfiy.user_id,
        email: verfiy.email
      });
    }
  })
  .get("/token/extended/:old_token", (req, res, next) => {
    const { old_token } = req.params;
    const valid = AuthService.verifyJwt(old_token);
    if (!valid) {
      return res
        .status(400)
        .json({ error: "The token supplied is not valid." });
    }

    const sub = AuthService.decodeJwt(old_token).sub;
    const payload = { user_id: AuthService.decodeJwt(old_token).user_id };
    res.send({
      user_id: payload.user_id,
      authToken: AuthService.createJwt(sub, payload)
    });
  });

module.exports = authRouter;
