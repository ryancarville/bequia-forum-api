const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const AuthService = {
	getUserWithUsername(db, userName) {
		return db('users')
			.where({ userName })
			.first();
	},
	comparePassword(password, hash) {
		return bcrypt.compare(password, hash);
	},
	createJwt(subject, payload) {
		return jwt.sign(payload, config.JWT_SECRET, {
			subject,
			expiresIn: config.JWT_EXPIRY,
			algorithm: 'HS256'
		});
	},
	verifyJwt(token) {
		return jwt.verify(token, config.JWT_SECRET, {
			algorithm: ['HS256']
		});
	},
	parseBasicToken(token) {
		return Buffer.from(token, 'base64')
			.toString()
			.split(':');
	}
};
module.exports = AuthService;
