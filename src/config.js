module.exports = {
	API_ENDPOINT: 'http://localhost:8000',
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	DATABASE_URL:
		process.env.DATABASE_URL ||
		'postgresql://ryancarville@localhost/bequia-forum',
	CLIENT_ORIGIN: '*',
	JWT_SECRET: process.env.JWT_SECRET || 'coconutDelight',
	JWT_EXPIRY: process.env.JWT_EXPIRY || '20m',
	TEST_DATABASE_URL: process.env.TEST_DATABASE_URL
};
