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
	.post('/addUser/:userId', (req, res, next) => {
		const db = req.app.get('db');
		const { userId } = req.params;
		if (!userId) {
			return res.status(401).json({ error: 'Request mus contain user id.' });
		}
		DirectoryService.insertUser(db, userId)
			.then(listing => {
				if (!listing) {
					return res
						.status(401)
						.json({ error: 'Listing could not be added to the directory.' });
				}
				return res.status(201).json(listing);
			})
			.cathc(err => {
				console.log(err);
				next(err);
			});
	})
	.delete('/delete/:userId', (req, res, next) => {
		const db = req.app.get('db');
		const { userId } = req.params;
		if (!userId) {
			return res.status(401).json({ error: 'Request mus contain user id.' });
		}
		DirectoryService.deletedUser(db, userId)
			.then(rowAffected => {
				if (!rowAffected) {
					return res
						.status(401)
						.json({ error: 'There is no entry with that id.' });
				}
				return res.status(204).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});

module.exports = directoryRouter;