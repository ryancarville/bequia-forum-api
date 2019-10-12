const xss = require('xss');

const MarkerPlaceService = {
	getMarketPlaceCats(db) {
		return db.select('*').from('market_place_cats');
	},
	getAllListings(db) {
		return db
			.select('*')
			.from('market_place')
			.orderBy('date_posted', 'desc');
	},
	getAllListingsInCat(db, marketplacecat) {
		return db
			.select('*')
			.from('market_place')
			.where({ marketplacecat });
	},
	getListingById(db, id) {
		return db
			.from('market_place')
			.where({ id })
			.first();
	},
	insertListing(db, newListing) {
		return db
			.into('market_place')
			.insert(newListing)
			.returning('*')
			.then(rows => rows[0]);
	},
	updateListing(db, updatedListing) {
		return db
			.into('market_place')
			.where({ id: updatedListing.id })
			.update(updatedListing);
	},
	deleteListing(db, id) {
		return db
			.from('market_place')
			.where({ id })
			.delete();
	},
	sortRentals(db, column, sort) {
		return db('market_place').orderBy(column, sort);
	},
	serializeListing(listing) {
		return {
			id: listing.id,
			userid: listing.user_id,
			marketplacecat: listing.market_place_cat,
			title: xss(listing.title),
			description: xss(listing.description),
			price: xss(listing.price),
			location: xss(listing.location),
			contactname: xss(listing.contact_name),
			contactemail: xss(listing.contact_email),
			contactphone: xss(listing.contact_phone),
			dateposted: listing.date_posted
		};
	}
};
module.exports = MarkerPlaceService;
