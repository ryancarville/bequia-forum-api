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
	.get('/get-posts-for/:boardId', (req, res, next) => {
		const db = req.app.get('db');
		const { boardId } = req.params;
		ForumService.getSpecificBoardPosts(db, boardId)
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
	.post('/add-post', (req, res, next) => {
		const db = req.app.get('db');
		const { boardid, userid, title, content, date, likes } = req.body;
		const newPost = { boardid, userid, title, content, date, likes };
		for (const feild of ['boardid', 'userid', 'title', 'content', 'date'])
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
						path.posix.join('/messageBoard', `/${post.boardid}`, `/${post.id}`)
					)
					.json(ForumService.serializePost(post));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/edit/:postId', (req, res, next) => {
		const db = req.app.get('db');
		const id = req.params.postId;
		const { boardid, title, content } = req.body;
		const updatedPost = { id, boardid, title, content };
		ForumService.updatePost(db, updatedPost)
			.then(post => {
				if (!post) {
					return res.status(401).json({ error: `Post doesn't exists.` });
				}
				res.status(202).json(ForumService.serializePost(post));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/post-like/:postId/:like', (req, res, next) => {
		const db = req.app.get('db');
		const { postId, like } = req.params;

		console.log(like);
		if (like === '+') {
			ForumService.addLike(db, postId)
				.then(post => {
					console.log(post);
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
			ForumService.subtractLike(db, postId)
				.then(post => {
					console.log(post);
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
	.delete('/posts/:postid', (req, res, next) => {
		const db = req.app.get('db');
		var { postid } = req.params;
		postid = parseInt(postid);
		ForumService.deletePost(db, postid)
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
