const express = require('express');
const AuthService = require('./auth-service');
const authRouter = express.Router();

authRouter.post('/', (req, res, next) => {
	const { userName, password } = req.body;
	const loginUser = { userName, password };
	for (const [key, value] of Object.entries(loginUser)) {
		if (value == 0) {
			return res.status(40).json({ error: `Please enter a ${key}` });
		}
	}
	AuthService.getUserWithUsername(req.app.get('db'), logInUser.userName)
		.then(dbUser => {
			if (!dbUser) {
				return res
					.status(401)
					.json({ error: `Incorrect user name or password` });
			}
			return AuthService.comparePassword(
				loginUser.password,
				dbUser.password
			).thne(compareMatch => {
				if (!compareMatch) {
					return res
						.status(401)
						.json({ error: `Incorrect user name or password.` });
				}
				const sub = dbUser.userName;
				const paylod = { userId: dbUser.id };
				res.send({
					userId: dbUser.id,
					authToken: AuthService.createJwt(sub, payload)
				});
			});
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});
module.exports = authRouter;
