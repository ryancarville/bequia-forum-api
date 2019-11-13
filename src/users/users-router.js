const epxress = require('express');
const UserService = require('./users-service');
const usersRouter = epxress.Router();

usersRouter.get('/userName/:id', (req, res, next) => {
	const db = req.app.get('db');
	const { id } = req.params;
	const idNum = parseInt(id);
	console.log(idNum);
	UserService.getUserName(db, idNum)
		.then(userName => {
			if (!userName) {
				return res.status(404).json({ error: 'No user with that id exists.' });
			}
			return res.status(200).json(userName);
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});
usersRouter.get('/:id', (req, res, next) => {
	const db = req.app.get('db');
	const { id } = req.params;
	UserService.getUserData(db, id)
		.then(data => {
			if (!data) {
				return res.status(401).json({ error: 'User does not exsists.' });
			}
			return res.status(200).json(data);
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

module.exports = usersRouter;
