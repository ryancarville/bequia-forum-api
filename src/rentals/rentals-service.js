const xss = require("xss");

const RentalsService = {
  getRentalCats(db) {
    return db.select("*").from("rental_cats");
  },
  getRentalCatName(db, id) {
    return db
      .select("name")
      .from("rental_cats")
      .where({ id })
      .first();
  },
  getAllRentalListings(db) {
    return db
      .select("*")
      .from("rentals")
      .orderBy("date_posted", "desc");
  },
  getAllListingsByCat(db, rental_cat) {
    return db.from("rentals").where({ rental_cat });
  },
  getListingById(db, id) {
    return db
      .from("rentals")
      .where({ id })
      .first();
  },
  insertListing(db, newListing) {
    return db
      .into("rentals")
      .insert(newListing)
      .returning("*")
      .then(rows => rows[0]);
  },
  updateListing(db, updatedListing) {
    return db
      .into("rentals")
      .where({ id: updatedListing.id })
      .update(updatedListing);
  },
  deleteListing(db, id) {
    return db
      .from("rentals")
      .where({ id })
      .delete();
  },
  sortRentals(db, column, sort) {
    return db("rentals").orderBy(column, sort);
  },
  serializeListing(listing) {
    return {
      id: listing.id,
      rentalcat: listing.rental_cat,
      userid: listing.user_id,
      title: xss(listing.title),
      description: xss(listing.description),
      location: xss(listing.location),
      price: xss(listing.price),
      contact_name: xss(listing.contact_name),
      contact_email: xss(listing.contact_email),
      contact_phone: xss(listing.contact_phone),
      date_posted: listing.date_posted,
      airbnb: xss(listing.airbnb),
      homeaway: xss(listing.homeaway),
      booking_dot_com: xss(listing.booking_dot_com),
      other_site: xss(listing.other_site)
    };
  }
};
module.exports = RentalsService;
