const xss = require('xss');

const RentalsService = {
	getRentalCats(db) {
		return db.select('*').from('rental_cats');
	},
	getAllRentalListings(db) {
		return db
			.select('*')
			.from('rentals')
			.orderBy('date_posted', 'desc');
	},
	getAllListingsByCat(db, rental_cat) {
		return db.from('rentals').where({ rental_cat });
	},
	getListingById(db, id) {
		return db
			.from('rentals')
			.where({ id })
			.first();
	},
	insertListing(db, newListing) {
		return db
			.into('rentals')
			.insert(newListing)
			.returning('*')
			.then(rows => rows[0]);
	},
	updateListing(db, updatedListing) {
		return db
			.into('rentals')
			.where({ id: updatedListing.id })
			.update(updatedListing);
	},
	deleteListing(db, id) {
		return db
			.from('rentals')
			.where({ id })
			.delete();
	},
	sortRentals(db, column, sort) {
		return db('rentals').orderBy(column, sort);
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
			contactname: xss(listing.contact_name),
			contactemail: xss(listing.contact_email),
			contactphone: xss(listing.contact_phone),
			dateposted: listing.date_posted
		};
	}
};
module.exports = RentalsService;
