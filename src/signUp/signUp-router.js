const express = require('express');
const SignUpService = require('./signUp-service');
const signUpRouter = express.Router();

signUpRouter.post('/', (req, res, next) => {
	const db = req.app.get('db');
	const { firstName, lastName, email, userName, password } = req.body;
	for (const feild of [
		'firstName',
		'lastName',
		'email',
		'userName',
		'password'
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

	SignUpService.hasUserWithUserName(db, userName)
		.then(hasUserWithUserName => {
			if (hasUserWithUserName) {
				return res.status(400).json({ error: 'Username is already taken.' });
			}
			return SignUpService.hashPassword(password).then(hashedPassword => {
				const newUser = {
					firstName,
					lastName,
					email,
					userName,
					password: hashedPassword,
					dateCreated: 'now()'
				};
				return SignUpService.insertUser(db, newUser).then(user => {
					return res
						.status(201)
						.location(path.prosix.join('/user', `${user.id}`))
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
