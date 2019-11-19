const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

const AuthService = {
  getUserWithEmail(db, email) {
    return db("users")
      .where({ email })
      .first();
  },
  getUserWithUserName(db, user_name) {
    return db("users")
      .where({ user_name })
      .first();
  },
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      expiresIn: config.JWT_EXPIRY,
      algorithm: "HS256"
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"]
    });
  },
  decodeJwt(token) {
    return jwt.decode(token, config.JWT_SECRET);
  },
  parseBasicToken(token) {
    return Buffer.from(token, "base64")
      .toString()
      .split(":");
  }
};
module.exports = AuthService;
