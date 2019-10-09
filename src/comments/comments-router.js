const express = require('express');
const CommentsServcie = require('./comments-service');
const commentsRouter = express.Router();

commentsRouter
	.get('/', (req, res, next) => {
		const db = req.app.get('db');
		CommentsServcie.getAllComments(db)
			.then(comments => {
				if (!comments) {
					return res
						.status(401)
						.json({ error: 'There are no comments in the database.' });
				}
				return res.status(200).json(comments);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.post('/addComment', (req, res, next) => {
		const db = req.app.get('db');
		const { userid, content, dateposted, postid } = req.body;
		const newComment = { userid, content, dateposted, postid };
		for (const feild of ['userid', 'content', 'postid', 'dateposted'])
			if (!req.body[feild]) {
				return res
					.status(401)
					.json({ error: `Must contain ${feild} in request body.` });
			}
		CommentsServcie.insertComment(db, newComment)
			.then(comment => {
				if (!comment) {
					return res
						.status(401)
						.json({ error: 'Comment was not inserted into the database.' });
				}
				return res.status(201).json(CommentsServcie.serializeComment(comment));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.delete('/delete/:id', (req, res, next) => {
		const db = req.app.get('db');
		var { id } = req.params;
		id = parseInt(id);
		CommentsServcie.deleteComment(db, id)
			.then(rowAffected => {
				if (!rowAffected) {
					return res
						.status(401)
						.json({ error: 'Comment could not be delete.' });
				}
				return res.status(201).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});
module.exports = commentsRouter;
