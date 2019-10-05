require('dotenv').config;
const { CLIENT_ORIGIN } = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helemt = require('helmet');
const JsonParser = express.json();
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganOption));
app.use(cors());
app.use(
	cors({
		origin: CLIENT_ORIGIN
	})
);
app.use(helemt());
app.use(JsonParser);

app.get('/', (req, res) => {
	res.send('Hello, boilerplate!');
});

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
