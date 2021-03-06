const express = require("express");
const path = require("path");
const EventsService = require("./events-service");
const eventsRouter = express.Router();
//events router
eventsRouter
  //sort events
  .get("/sort", (req, res, next) => {
    const db = req.app.get("db");
    EventsService.sortListings(db).then(sortedList => {
      if (!sortedList) {
        return res.status(401).josn({ error: "Sort could not be completed." });
      }
      return res.status(200).json(sortListings);
    });
  })
  //get all events
  .get("/", (req, res, next) => {
    const db = req.app.get("db");
    EventsService.getAllEvents(db)
      .then(events => {
        if (!events) {
          return res
            .status(401)
            .json({ error: "There are no events in the database." });
        }
        return res.status(200).json(events);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get event by id
  .get("/:event_id", (req, res, next) => {
    const db = req.app.get("db");
    var { event_id } = req.params;
    event_id = parseInt(event_id, 10);
    EventsService.getEventById(db, event_id)
      .then(event => {
        if (!event) {
          return res.status(401).json({ error: "That event does not exists." });
        }
        return res.status(200).json(event);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get all events by user id
  .get("/user/:id", (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    EventsService.getAllEventsByUserId(db, parseInt(id))
      .then(data => {
        if (!data) {
          return res
            .status(401)
            .json({ error: "There are no events for your account." });
        }
        return res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get this upcoming weeks events
  .get("/thisWeek/:today/:nextWeek", (req, res, next) => {
    const db = req.app.get("db");
    const { today, nextWeek } = req.params;
    EventsService.getThisWeeksEvents(db, today, nextWeek).then(events => {
      if (!events) {
        return res
          .status(200)
          .json({ error: `There are no events for this week.` });
      }

      return res.status(200).json(events);
    });
  })
  //add event
  .post("/addEvent", (req, res, next) => {
    const db = req.app.get("db");
    const {
      title,
      location,
      event_date,
      event_time,
      description,
      user_id,
      date_posted
    } = req.body;
    const newEvent = {
      title,
      location,
      event_date,
      event_time,
      description,
      user_id,
      date_posted
    };
    for (const feild of [
      "user_id",
      "title",
      "description",
      "location",
      "event_date",
      "event_time",
      "date_posted"
    ])
      if (!req.body[feild]) {
        return res
          .status(401)
          .json({ error: `Must contain ${feild} in request body.` });
      }
    EventsService.insertEvent(db, newEvent)
      .then(event => {
        if (!event) {
          return res.status(401).json({ error: "Event coudld not be added." });
        }
        return res
          .status(201)
          .location(path.posix.join("/events", `/${event.id}`))
          .json(EventsService.serializeEvent(event));
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //edit event
  .patch("/edit", (req, res, next) => {
    const db = req.app.get("db");
    const {
      id,
      title,
      description,
      location,
      event_date,
      event_time
    } = req.body;
    const eventToUpdate = {
      id,
      title,
      description,
      location,
      event_date,
      event_time
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
  //delete event
  .delete("/delete/:event_id", (req, res, next) => {
    const db = req.app.get("db");
    const { event_id } = req.params;
    EventsService.deleteEvent(db, event_id)
      .then(rowAffected => {
        if (!rowAffected) {
          return res
            .status(401)
            .json({ error: "No event with that id exists." });
        }
        return res.status(201).json(rowAffected);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  });

module.exports = eventsRouter;
