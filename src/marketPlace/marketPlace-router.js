const express = require('express');
const MarketPlaceService = require('./marketPlace-service');
const marketPlaceRouter = express.Router();

marketPlaceRouter
	.get('/catagories', (req, res, next) => {
		const db = req.app.get('db');
		MarketPlaceService.getMarketPlaceCats(db)
			.then(cats => {
				if (!cats) {
					return res.status(401).json({
						error: 'There are no market place catagories in the data base'
					});
				}
				return res.status(200).json(cats);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/listings', (req, res, next) => {
		const db = req.app.get('db');
		MarketPlaceService.getAllListings(db)
			.then(listings => {
				if (!listings) {
					return res.status(401).json({
						error: 'There are no market place listing in the database.'
					});
				}
				return res.status(200).json(listings);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/listings-by-cat/:market_place_cat', (req, res, next) => {
		const db = req.app.get('db');
		var { market_place_cat } = req.params;
		market_place_cat = parseInt(market_place_cat, 10);
		MarketPlaceService.getAllListingsByCat(db, market_place_cat)
			.then(listings => {
				if (listings.length === 0) {
					return res.status(200).json({
						error: 'There are no market place listing in this catagory.'
					});
				}
				return res.status(200).json(listings);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/listings/:id', (req, res, next) => {
		const db = req.app.get('db');
		var { id } = req.params;
		id = parseInt(id, 10);
		MarketPlaceService.getListingById(db, id)
			.then(listing => {
				if (listing.length === 0) {
					return res.status(200).json({
						error: 'Listing does not exists.'
					});
				}
				return res.status(200).json(listing);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/sort/:column/:sortType', (req, res, next) => {
		const db = req.app.get('db');
		const { column, sortType } = req.params;
		MarketPlaceService.sortRentals(db, column, sortType)
			.then(dir => {
				if (!dir) {
					return res
						.status(401)
						.json({ error: 'Something went wrong sorting the directory.' });
				}
				return res.status(200).json(dir);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.post('/addListing', (req, res, next) => {
		const db = req.app.get('db');
		const {
			market_place_cat,
			user_id,
			title,
			description,
			location,
			price,
			contact_name,
			contact_email,
			contact_phone,
			date_posted
		} = req.body;
		const newListing = {
			market_place_cat,
			user_id,
			title,
			description,
			location,
			price,
			contact_name,
			contact_email,
			contact_phone,
			date_posted
		};
		for (const feild of [
			'market_place_cat',
			'user_id',
			'title',
			'description',
			'contact_name',
			'contact_email'
		])
			if (!req.body[feild]) {
				return res
					.status(401)
					.json({ error: `Request body must contain ${feild}` });
			}
		MarketPlaceService.insertListing(db, newListing)
			.then(listing => {
				if (!listing) {
					return res
						.status(401)
						.json({ error: 'Listing could not be aded to data base.' });
				}
				return res
					.status(201)
					.json(MarketPlaceService.serializeListing(listing));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/edit', (req, res, next) => {
		const db = req.app.get('db');
		const {
			id,
			market_place_cat,
			title,
			description,
			location,
			price,
			contact_name,
			contact_email,
			contact_phone
		} = req.body;
		const listingToUpdate = {
			id,
			market_place_cat,
			title,
			description,
			location,
			price,
			contact_name,
			contact_email,
			contact_phone
		};
		const numOfValues = Object.entries(listingToUpdate).filter(Boolean).length;
		if (numOfValues === 0) {
			return res.status(401).json({
				error:
					'Request body must contain one of the following: Market Place Catagory, title, description, location, price, contact name, contact, email or contact, phone.'
			});
		}
		MarketPlaceService.updateListing(db, listingToUpdate)
			.then(numRowsAffected => {
				if (!numRowsAffected) {
					return res.status(401).json({ error: 'Could not update listing.' });
				}
				return res.status(201).json(numRowsAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.delete('/delete/:id', (req, res, next) => {
		const db = req.app.get('db');
		const { id } = req.params;
		MarketPlaceService.deleteListing(db, id)
			.then(rowAffected => {
				if (!rowAffected) {
					return res
						.status(401)
						.json({ error: 'No listing with that id exists.' });
				}
				return res.status(201).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});
module.exports = marketPlaceRouter;
