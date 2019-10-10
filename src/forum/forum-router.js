const express = require('express');
const path = require('path');
const ForumService = require('./forum-service');
const forumRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

forumRouter
	.get('/catagories', (req, res, next) => {
		const db = req.app.get('db');
		ForumService.getMessageBoardSections(db)
			.then(sections => {
				if (!sections) {
					return res.status(401).json({
						error: 'Something went wrong when retriving message board sections.'
					});
				}
				return res.status(200).json(sections);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/messageBoards', (req, res, next) => {
		const db = req.app.get('db');
		ForumService.getAllMessageBoards(db)
			.then(boards => {
				if (!boards) {
					return res.status(500).json({
						error: 'Something went wrong when retriving the message boards.'
					});
				}

				return res.status(200).json(boards);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/newestPosts', (req, res, next) => {
		const db = req.app.get('db');
		ForumService.getNewestPosts(db)
			.then(posts => {
				if (!posts) {
					return res
						.state(401)
						.json({ error: 'Something went wrong when retriving posts' });
				}
				return res.status(200).json(posts);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/posts', (req, res, next) => {
		const db = req.app.get('db');
		ForumService.getAllMessageBoardPosts(db)
			.then(posts => {
				if (!posts) {
					return res
						.state(401)
						.json({ error: 'Something went wrong when retriving posts' });
				}
				return res.status(200).json(posts);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/get-posts-for/:board_id', (req, res, next) => {
		const db = req.app.get('db');
		const { board_id } = req.params;
		ForumService.getSpecificBoardPosts(db, board_id)
			.then(posts => {
				if (!posts) {
					return res
						.status(401)
						.json({ error: 'There are no posts for this board.' });
				}
				return res.status(200).json(posts);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.post('/addPost', (req, res, next) => {
		const db = req.app.get('db');
		const { board_id, user_id, title, content, date_posted, likes } = req.body;
		const newPost = { board_id, user_id, title, content, date_posted, likes };
		for (const feild of [
			'board_id',
			'user_id',
			'title',
			'content',
			'date_posted'
		])
			if (!req.body[feild]) {
				return res
					.status(401)
					.json({ error: `Must contain ${feild} in request body.` });
			}
		ForumService.insertPost(db, newPost)
			.then(post => {
				if (!post) {
					return res.status(401).json({ error: 'Could not add your post.' });
				}
				return res
					.status(201)
					.location(
						path.posix.join('/messageBoard', `/${post.board_id}`, `/${post.id}`)
					)
					.json(ForumService.serializePost(post));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/edit', (req, res, next) => {
		const db = req.app.get('db');
		const { id, board_id, title, content } = req.body;
		const postToUpdate = { id, board_id, title, content };
		const numOfValues = Object.entries(postToUpdate).filter(Boolean).length;
		if (numOfValues === 0) {
			return res.status(401).json({
				error: 'Request body must contain title or content.'
			});
		}
		ForumService.updatePost(db, postToUpdate)
			.then(post => {
				if (!post) {
					return res.status(401).json({ error: `Post doesn't exists.` });
				}
				res.status(201).json(ForumService.serializePost(post));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/post-like/:post_id/:like', (req, res, next) => {
		const db = req.app.get('db');
		const { post_id, like } = req.params;
		if (like === '+') {
			ForumService.addLike(db, post_id)
				.then(post => {
					if (!post) {
						return res
							.status(401)
							.json({ error: 'Could not add a like to the post.' });
					}
					return res.status(201).json(post);
				})
				.catch(err => {
					console.log(err);
					next(err);
				});
		}
		if (like === '-') {
			ForumService.subtractLike(db, post_id)
				.then(post => {
					if (!post) {
						return res
							.status(401)
							.json({ error: 'Could not subtract a like from the post.' });
					}
					return res.status(201).json(post);
				})
				.catch(err => {
					console.log(err);
					next(err);
				});
		}
	})
	.delete('/posts/:post_id', (req, res, next) => {
		const db = req.app.get('db');
		var { post_id } = req.params;
		postid = parseInt(post_id);
		ForumService.deletePost(db, post_id)
			.then(rowAffected => {
				if (!rowAffected) {
					return res.status(401).json({ error: `Post doesn't exsist.` });
				}
				res.status(201).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});
module.exports = forumRouter;
