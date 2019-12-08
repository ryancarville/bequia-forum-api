const express = require("express");
const RentalsService = require("./rentals-service");
const rentalRouter = express.Router();
//rentals router
rentalRouter
  //get all rentals catagories
  .get("/catagories", (req, res, next) => {
    const db = req.app.get("db");
    RentalsService.getRentalCats(db)
      .then(cats => {
        if (!cats) {
          return res
            .statue(401)
            .json({ error: "There are no rental cats in the database. " });
        }
        return res.status(200).json(cats);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get rentals catagory by id
  .get("/catagories/:id", (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    if (!id) {
      return res
        .status(401)
        .json({ error: "Request must contain rental catagory." });
    }
    RentalsService.getRentalCatName(db, parseInt(id))
      .then(name => {
        if (!name) {
          return res
            .status(404)
            .json({ error: "No catagory with that rental id exists." });
        }
        return res.status(200).json(name);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get all rentals listings
  .get("/listings", (req, res, next) => {
    const db = req.app.get("db");
    RentalsService.getAllRentalListings(db)
      .then(cats => {
        if (!cats) {
          return res
            .statue(401)
            .json({ error: "There are no rental listings in the database. " });
        }
        return res.status(200).json(cats);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get all rentals listing by catagory
  .get("/listings-by-cat/:rental_cat", (req, res, next) => {
    const db = req.app.get("db");
    var { rental_cat } = req.params;
    rental_cat = parseInt(rental_cat, 10);
    RentalsService.getAllListingsByCat(db, rental_cat)
      .then(listings => {
        if (listings.length === 0) {
          return res.status(200).json({
            error: `There are no rental listings for this catagory.`
          });
        }

        return res.status(200).json(listings);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get rentals listing by id
  .get("/listing/:id", (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    RentalsService.getListingById(db, id)
      .then(listing => {
        if (!listing) {
          return res
            .status(401)
            .json({ error: "There is no listing with that ID." });
        }
        return res.status(200).json(RentalsService.serializeListing(listing));
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //add listing
  .post("/addListing", (req, res, next) => {
    const db = req.app.get("db");
    const {
      user_id,
      rental_cat,
      title,
      description,
      location,
      price,
      contact_name,
      contact_email,
      contact_phone,
      airbnb,
      homeaway,
      booking_dot_com,
      other_site
    } = req.body;
    const newListing = {
      user_id,
      rental_cat,
      title,
      description,
      location,
      price,
      contact_name,
      contact_email,
      contact_phone,
      airbnb,
      homeaway,
      booking_dot_com,
      other_site
    };
    for (const feild of [
      "user_id",
      "rental_cat",
      "title",
      "description",
      "location",
      "contact_name",
      "contact_email"
    ])
      if (!req.body[feild]) {
        return res
          .status(401)
          .json({ error: `Mustin contain ${feild} in request body.` });
      }
    RentalsService.insertListing(db, newListing)
      .then(listing => {
        if (!listing) {
          return res
            .status(401)
            .json({ error: "Listing could not be added to the database." });
        }
        return res.status(201).json(RentalsService.serializeListing(listing));
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //edit listing
  .patch("/edit", (req, res, next) => {
    const db = req.app.get("db");
    const {
      id,
      user_id,
      rental_cat,
      title,
      description,
      location,
      price,
      contact_name,
      contact,
      email,
      contact_phone,
      airbnb,
      homeaway,
      booking_dot_com,
      othersite
    } = req.body;
    const listingToUpdate = {
      id,
      user_id,
      rental_cat,
      title,
      description,
      location,
      price,
      contact_name,
      contact,
      email,
      contact_phone,
      airbnb,
      homeaway,
      booking_dot_com,
      othersite
    };
    const numOfValues = Object.entries(listingToUpdate).filter(Boolean).length;
    if (numOfValues === 0) {
      return res.status(401).json({
        error:
          "Request body must contain rental catagory, title, description, location, price, contact name, contact email, contact phone or booking sites."
      });
    }
    RentalsService.updateListing(db, listingToUpdate)
      .then(numRowsAffected => {
        if (!numRowsAffected) {
          return res.status(401).json({ error: "Could not update listing." });
        }
        return res.status(201).json(numRowsAffected);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //delete listing
  .delete("/delete/:id", (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    RentalsService.deleteListing(db, id)
      .then(rowAffected => {
        if (!rowAffected) {
          return res
            .status(401)
            .json({ error: "No listing with that id exists." });
        }
        return res.status(201).json(rowAffected);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  });
module.exports = rentalRouter;
