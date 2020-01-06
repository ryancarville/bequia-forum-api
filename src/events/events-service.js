const xss = require("xss");

const EventService = {
  getAllEvents(db) {
    return db.select("*").from("events");
  },
  getEventById(db, id) {
    return db
      .from("events")
      .where({ id })
      .first();
  },
  getAllEventsByUserId(db, id) {
    return db.from("events").where({ user_id: id });
  },
  insertEvent(db, newEvent) {
    return db
      .into("events")
      .insert(newEvent)
      .returning("*")
      .then(rows => rows[0]);
  },
  getThisWeeksEvents(db, today, nextWeek) {
    return db
      .from("events")
      .whereBetween("event_date", [today, nextWeek])
      .orderBy("event_date", "asc");
  },
  updateEvent(db, updatedEvent) {
    return db
      .into("events")
      .where({ id: updatedEvent.id })
      .update(updatedEvent);
  },
  deleteEvent(db, id) {
    return db
      .from("events")
      .where({ id })
      .delete();
  },
  sortListings(db) {
    return db
      .select("*")
      .from("events")
      .orderBy("title", "asc");
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
