module.exports = {
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	DATABASE_URL:
		process.env.DATABASE_URL ||
		'postgres://dtvgriqrkfctkv:3d35aa1e42201a26d9a90a11c72dc099d05a87694373d4a13b5eea008011c252@ec2-54-197-241-96.compute-1.amazonaws.com:5432/ddbpi3lku41erm',
	CLIENT_ORIGIN: '*',
	JWT_SECRET: process.env.JWT_SECRET || 'coconutDelight',
	JWT_EXPIRY: process.env.JWT_EXPIRY || '20m',
	TEST_DATABASE_URL: process.env.TEST_DATABASE_URL
};
