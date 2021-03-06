const AuthService = require("../auth/auth-service");
//JWT token generator and verifyer
function requireAuth(req, res, next) {
  const authToken = req.get("authorization") || "";
  let bearerToken;

  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }
  try {
    const payload = AuthService.verifyJwt(bearerToken);
    const db = req.app.get("db");

    AuthService.getUserWithUsername(db, payload.sub)
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: `Unauithroized access` });
        }
        req.user = user;
        next();
      })
      .cathc(err => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized request" });
  }
}
module.exports = { requireAuth };
