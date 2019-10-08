const xss = require('xss');

const RentalsService = {
	getRentalCats(db) {
		return db.select('*').from('bf_rental_cats');
	},
	getAllRentalListings(db) {
		return db.select('*').from('bf_rentals');
	},
	getAllListingsForCat(db, rentalcat) {
		return db.from('bf_rentals').where({ rentalcat });
	},
	getListingById(db, id) {
		return db
			.from('bf_rentals')
			.where({ id })
			.first();
	},
	insertListing(db, newListing) {
		return db
			.into('bf_rentals')
			.insert(newListing)
			.returing('*')
			.then(rows => rows[0]);
	},
	updateListing(db, updatedListing) {
		return db
			.into('bf_rentals')
			.where({ id: updatedListing.id })
			.update(updatedListing);
	},
	deleteListing(db, id) {
		return db
			.from('bf_rentals')
			.where({ id })
			.delete();
	},
	serializeListing(listing) {
		return {
			id: listing.id,
			rentalcat: listing.rentalcat,
			userid: listing.userid,
			title: xss(listing.title),
			description: xss(listing.description),
			location: xss(listing.location),
			price: xss(listing.price),
			contactname: xss(listing.contactname),
			contactemail: xss(listing.contactemail),
			contactphone: xss(listing.contactphone),
			dateposted: listing.dateposted
		};
	}
};
module.exports = RentalsService;
