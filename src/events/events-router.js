const express = require('express');
const path = require('path');
const EventsService = require('./events-service');
eventsRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');
