const xss = require('xss');

const MarkerPlaceService = {
	getMarketPlaceCats(db) {
		return db.select('*').from('bf_market_place_cats');
	},
	getAllListings(db) {
		return db.select('*').from('bf_market_place');
	},
	getAllListingsInCat(db, marketplacecat) {
		return db
			.select('*')
			.from('bf_market_place')
			.where({ marketplacecat });
	},
	getListingById(db, id) {
		return db
			.from('bf_market_place')
			.where({ id })
			.first();
	},
	insertListing(db, newListing) {
		return db
			.into('bf_market_place')
			.insert(newListing)
			.returning('*')
			.then(rows => rows[0]);
	},
	updateListing(db, updatedListing) {
		return db
			.into('bf_market_place')
			.where({ id: updatedListing.id })
			.update(updatedListing);
	},
	deleteListing(db, id) {
		return db
			.from('bf_market_place')
			.where({ id })
			.delete();
	},
	serializeListing(listing) {
		return {
			id: listing.id,
			userid: listing.userid,
			marketplacecat: listing.marketplacecat,
			title: xss(listing.title),
			description: xss(listing.description),
			price: xss(listing.price),
			location: xss(listing.location),
			contactname: xss(listing.contactname),
			contactemail: xss(listing.contactemail),
			contactphone: xss(listing.contactphone),
			dateposted: listing.dateposted
		};
	}
};
module.exports = MarkerPlaceService;
