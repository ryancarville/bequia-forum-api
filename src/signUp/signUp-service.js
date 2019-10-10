const xss = require('xss');
const bcrypt = require('bcryptjs');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[S]+/g;

const SignUpService = {
	hasUserWithUserName(db, user_name) {
		return db
			.from('users')
			.where({ user_name })
			.first()
			.then(user => !!user);
	},
	insertUser(db, newUser) {
		return db
			.insert(newUser)
			.into('users')
			.returning('*')
			.then(([user]) => user);
	},
	validatePassword(password) {
		if (password.length < 8) {
			return 'Password must be longer than 8 characters.';
		}
		if (password > 72) {
			return 'Passsword must be less than 72 characters.';
		}
		if (password.startsWith(' ') || password.endsWith(' ')) {
			return 'Password must not start or end with a empty space.';
		}
		if (REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
			return 'Password must contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.';
		}
		return null;
	},
	hashPassword(password) {
		return bcrypt.hash(password, 12);
	},
	serializeUser(user) {
		return {
			id: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			userName: user.user_name
		};
	}
};
module.exports = SignUpService;
