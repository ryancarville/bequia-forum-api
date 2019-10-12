const express = require('express');
const AuthService = require('./auth-service');
const authRouter = express.Router();

authRouter.post('/', (req, res, next) => {
	const { email, user_name, password } = req.body;
	const logInUser = { email, user_name, password };
	console.log(logInUser);
	for (const [key, value] of Object.entries(logInUser)) {
		if (value == 0) {
			return res.status(40).json({ error: `Please enter a ${key}` });
		}
	}
	if (logInUser.email) {
		AuthService.getUserWithEmail(req.app.get('db'), logInUser.email)
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
					console.log(sub);
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
		AuthService.getUserWithUserName(req.app.get('db'), logInUser.user_name)
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
					console.log(sub);
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
});

module.exports = authRouter;
