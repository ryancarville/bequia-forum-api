const express = require('express');
const path = require('path');
const EventsService = require('./events-service');
const eventsRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

eventsRouter.get('/sort', (req, res, next) => {
	const db = req.app.get('db');
	EventsService.sortListings(db).then(sortedList => {
		if (!sortedList) {
			return res.status(401).josn({ error: 'Sort could not be completed.' });
		}
		return res.status(200).json(sortListings);
	});
});
eventsRouter
	.get('/', (req, res, next) => {
		const db = req.app.get('db');
		EventsService.getALlEvents(db)
			.then(events => {
				if (!events) {
					return res
						.status(401)
						.json({ error: 'There are no events in the database.' });
				}
				return res.status(200).json(events);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/:eventId', (req, res, next) => {
		const db = req.app.get('db');
		const { eventId } = req.params;
		EventsService.getEventById(db, eventId)
			.then(event => {
				if (!event) {
					return res.status(401).json({ error: 'That event does not exists.' });
				}
				return res.status(200).json(event);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.post('/addEvent', (req, res, next) => {
		const db = req.app.get('db');
		const {
			title,
			location,
			eventdate,
			eventtime,
			description,
			userid,
			dateposted
		} = req.body;
		const newEvent = {
			title,
			location,
			eventdate,
			eventtime,
			description,
			userid,
			dateposted
		};
		for (const feild of [
			'userid',
			'title',
			'description',
			'location',
			'eventdate',
			'eventtime',
			'dateposted'
		])
			if (!req.body[feild]) {
				return res
					.status(401)
					.json({ error: `Must contain ${feild} in request body.` });
			}
		EventsService.insertEvent(db, newEvent)
			.then(event => {
				if (!event) {
					return res.status(401).json({ error: 'Event coudld not be added.' });
				}
				return res
					.status(201)
					.location(path.posix.join('/events', `/${event.id}`))
					.json(EventsService.serializeEvent(event));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/edit', (req, res, next) => {
		const db = req.app.get('db');

		const { id, title, description, location, eventdate, eventtime } = req.body;
		const eventToUpdate = {
			id,
			title,
			description,
			location,
			eventdate,
			eventtime
		};
		const numOfValues = Object.entries(eventToUpdate).filter(Boolean).length;
		if (numOfValues === 0) {
			return res.status(401).json({
				error: `Request must contain title, description, location, event date or event time.`
			});
		}

		EventsService.updateEvent(db, eventToUpdate)
			.then(numRowsAffected => {
				if (!numRowsAffected) {
					return res.status(401).json({ error: `Could not update event` });
				}
				return res.status(201).json(numRowsAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.delete('/delete/:eventId', (req, res, next) => {
		const db = req.app.get('db');
		const { eventId } = req.params;
		EventsService.deleteEvent(db, eventId)
			.then(rowAffected => {
				if (!rowAffected) {
					return res
						.status(401)
						.json({ error: 'No event with that id exists.' });
				}
				return res.status(201).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});

module.exports = eventsRouter;
