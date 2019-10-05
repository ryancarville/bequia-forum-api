require('dotenv').config;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helemt = require('helmet');
const jsonBodyParser = express.json();
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');
const app = express();
const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
//routers
const authRouter = require('./auth/auth-router');
const singUpRouter = require('./signUp/signUp-router');
const logInRouter = require('./logIn/logIn-router');
const forumRouter = require('./forum/forum-router');
const jobsRouter = require('./jobs/jobs-router');
const eventsRouter = require('./events/events-router');
const rentalsRouter = require('./rentals/rentals-router');
const marketPlaceRouter = require('./marketPlace/marketPlace-router');

app.use(morgan(morganOption));
app.use(cors());
app.use(
	cors({
		origin: CLIENT_ORIGIN
	})
);
app.use(helemt());
app.use(jsonBodyParser);
//paths
app.use('/singUp', singUpRouter);
app.use('/login', logInRouter);
app.use('/auth', authRouter);
app.use('/forum', forumRouter);
app.use('/events', eventsRouter);
app.use('/jobs', jobsRouter);
app.use('/rentals', rentalsRouter);
app.use('/marketPlace', marketPlaceRouter);
//error handler
app.use(function errorHandler(error, req, res, next) {
	let response;
	if (NODE_ENV === 'production') {
		response = { error: { message: 'server error' } };
	} else {
		console.error(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response);
});

module.exports = app;
