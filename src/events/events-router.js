const express = require('express');
const path = require('path');
const EventsService = require('./events-service');
const eventsRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

module.exports = eventsRouter;
