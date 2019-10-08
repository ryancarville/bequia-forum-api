const express = require('express');
const RentalsService = require('./rentals-service');
const rentalRouter = express.Router();

rentalRouter
	.get('/catagories', (req, res, next) => {
		const db = req.app.get('db');
		RentalsService.getRentalCats(db)
			.then(cats => {
				if (!cats) {
					return res
						.statue(401)
						.json({ error: 'There are no rental cats in the database. ' });
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
		RentalsService.getAllRentalListings(db)
			.then(cats => {
				if (!cats) {
					return res
						.statue(401)
						.json({ error: 'There are no rental listings in the database. ' });
				}
				return res.status(200).json(cats);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/catagory/:rentalType', (req, res, next) => {
		const db = req.app.get('db');
		const { rentalType } = req.params;
		RentalsService.getAllListingsForCat(db, rentalType)
			.then(listings => {
				if (!listings) {
					return res.status(401).json({
						error: 'There are not rental listings for this catagory.'
					});
				}
				return res.status(200).json(listings);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/listings/:listingId', (req, res, next) => {
		const db = req.app.get('db');
		const { listingId } = req.params;
		RentalsService.getListingById(db, listingId)
			.then(listing => {
				if (!listing) {
					return res
						.status(401)
						.json({ error: 'There is no listing with that ID.' });
				}
				return res.status(200).json(RentalsService.serializeListing(listing));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.post('/addListing', (req, res, next) => {
		const db = req.app.get('db');
		const {
			userid,
			rentalcat,
			title,
			description,
			location,
			price,
			contactname,
			contact,
			email,
			contactphone,
			airbnb,
			homeaway,
			bookingdotcome,
			othersite
		} = req.body;
		const newListing = {
			userid,
			rentalcat,
			title,
			description,
			location,
			price,
			contactname,
			contact,
			email,
			contactphone,
			airbnb,
			homeaway,
			bookingdotcome,
			othersite
		};
		for (const feild of [
			'userid',
			'rentalcat',
			'title',
			'description',
			'location',
			'contactname',
			'contactemail'
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
						.json({ error: 'Listing could not be added to the database.' });
				}
				return res.status(201).json(RentalsService.serializeListing(listing));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/edit/:listingId', (req, res, next) => {
		const db = req.app.get('db');
		const {
			userid,
			rentalcat,
			title,
			description,
			location,
			price,
			contactname,
			contact,
			email,
			contactphone,
			airbnb,
			homeaway,
			bookingdotcome,
			othersite
		} = req.body;
		const listingToUpdate = {
			userid,
			rentalcat,
			title,
			description,
			location,
			price,
			contactname,
			contact,
			email,
			contactphone,
			airbnb,
			homeaway,
			bookingdotcome,
			othersite
		};
		const numOfValues = Object.entries(listingToUpdate).filter(Boolean).length;
		if (numOfValues === 0) {
			return res.status(401).json({
				error:
					'Request body must contain rental catagory, title, description, location, price, contact name, contact email, contact phone or booking sites.'
			});
		}
		RentalsService.updateListing(db, listingToUpdate)
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
	.delete('/delete/:listingId', (req, res, next) => {
		const db = req.app.get('db');
		const { listingId } = req.params;
		RentalsService.deleteListing(db, listingId)
			.then(rowAffected => {
				if (!rowAffected) {
					return res
						.status(401)
						.json({ error: 'No listing with that id exists.' });
				}
				return res.status(204).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});
module.exports = rentalRouter;
