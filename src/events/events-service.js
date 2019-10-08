const xss = require('xss');

const EventService = {
	getALlEvents(db) {
		return db.select('*').from('bf_events');
	},
	getEventById(db, id) {
		return db
			.from('bf_events')
			.where({ id })
			.first();
	},
	insertEvent(db, newEvent) {
		return db
			.into('bf_events')
			.insert(newEvent)
			.returning('*')
			.then(rows => rows[0]);
	},
	updateEvent(db, updatedEvent) {
		return db
			.into('bf_events')
			.where({ id: updatedEvent.id })
			.update(updatedEvent);
	},
	deleteEvent(db, id) {
		return db
			.from('bf_events')
			.where({ id })
			.delete();
	},
	sortListings(db) {
		return db
			.select('*')
			.from('bf_events')
			.orderBy('title', 'asc');
	},
	serializeEvent(event) {
		return {
			id: event.id,
			userid: event.userid,
			title: xss(event.title),
			description: xss(event.description),
			location: xss(event.location),
			eventdate: xss(event.eventDate),
			eventtime: xss(event.eventTime),
			dateposted: xss(event.datePosted)
		};
	}
};
module.exports = EventService;
