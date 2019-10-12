const express = require('express');
const DirectoryService = require('./directory-service');
const directoryRouter = express.Router();

directoryRouter
	.get('/', (req, res, next) => {
		const db = req.app.get('db');
		DirectoryService.getAllListings(db)
			.then(dir => {
				if (!dir) {
					return res
						.status(401)
						.json({ error: 'Something went wrong getting the directory.' });
				}
				return res.status(200).json(dir);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/sort/:column/:sortType', (req, res, next) => {
		const db = req.app.get('db');
		const { column, sortType } = req.params;
		DirectoryService.sortDirectory(db, column, sortType)
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
			user_id,
			first_name,
			last_name,
			address,
			city,
			country,
			email,
			phone,
			website
		} = req.body;
		const newListing = {
			user_id,
			first_name,
			last_name,
			address,
			city,
			country,
			email,
			phone,
			website
		};
		for (const feild of ['first_name', 'last_name']) {
			if (!req.body[feild]) {
				return res.status(401).json({ error: `Please enter a ${key}` });
			}
		}
		DirectoryService.insertListing(db, newListing)
			.then(listing => {
				if (!listing) {
					return res
						.status(401)
						.json({ error: 'Listing could not be added to the directory.' });
				}
				return res.status(201).json(listing);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.delete('/delete/:listingId', (req, res, next) => {
		const db = req.app.get('db');
		const { listingId } = req.params;
		const id = parseInt(listingId);
		if (!id) {
			return res.status(401).json({ error: 'Request mus contain listing id.' });
		}
		DirectoryService.deletedListing(db, id)
			.then(rowAffected => {
				if (!rowAffected) {
					return res
						.status(401)
						.json({ error: 'There is no entry with that id.' });
				}
				return res.status(201).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});

module.exports = directoryRouter;
