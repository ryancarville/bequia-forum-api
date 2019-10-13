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
	.get('/numOfThreads/:board_id', (req, res, next) => {
		const db = req.app.get('db');
		const { board_id } = req.params;
		ForumService.getNumOfThreads(db, board_id)
			.then(numOfThreads => {
				if (!numOfThreads) {
					return res
						.status(404)
						.json({ error: 'Message Board does not exist' });
				}
				return res.status(200).json(numOfThreads);
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
	.get('/search/posts/:term', (req, res, next) => {
		const db = req.app.get('db');
		var { term } = req.params;
		let posts = {};
		ForumService.searchAllBoardPosts(db, term)
			.then(mbPosts => {
				posts.mbPosts = mbPosts;
			})
			.then(() => {
				return ForumService.searchMarketPlace(db, term);
			})
			.then(mpPosts => {
				posts.mpPosts = mpPosts;
			})
			.then(() => {
				return ForumService.searchRentals(db, term);
			})
			.then(rPosts => {
				posts.rPosts = rPosts;
			})
			.then(() => {
				return ForumService.searchJobs(db, term);
			})
			.then(jPosts => {
				posts.jPosts = jPosts;
				return res.status(200).json(posts);
			})

			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/search/posts/:board_id/:term', (req, res, next) => {
		const db = req.app.get('db');
		var { board_id, term } = req.params;

		ForumService.searchBoardPosts(db, board_id, term)
			.then(posts => {
				if (!posts) {
					return res
						.status(404)
						.json({ error: `There are no posts with the term ${term}` });
				}
				console.log(posts);
				return res.status(200).json(posts);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/likesTracker', (req, res, next) => {
		const db = req.app.get('db');
		ForumService.getLikesTracker(db)
			.then(tracker => {
				if (!tracker) {
					return res.status(401).json({ error: 'Could not get likes tracker' });
				}
				return res.status(200).json(tracker);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/sort/:column/:sortType', (req, res, next) => {
		const db = req.app.get('db');
		const { column, sortType } = req.params;
		ForumService.sortPosts(db, column, sortType)
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
	.patch('/post/addLike/:post_id', (req, res, next) => {
		const db = req.app.get('db');
		const { post_id } = req.params;
		if (!post_id) {
			return res
				.status(401)
				.json({ error: `Request body must conatin post_id.` });
		}
		ForumService.addLike(db, post_id)
			.then(row => {
				if (!row) {
					return res
						.status(401)
						.json({ error: 'Could not add a like to the post.' });
				}
				return res.status(201).json(row);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/post/minusLike/:post_id', (req, res, next) => {
		const db = req.app.get('db');
		const { post_id } = req.params;
		if (!post_id) {
			return res
				.status(401)
				.json({ error: `Request body must contain post_id.` });
		}
		ForumService.minusLike(db, post_id)
			.then(row => {
				if (!row) {
					return res
						.status(401)
						.json({ error: 'Could not minus like to post.' });
				}
				return res.status(201).json(row);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.post('/post/addToTracker', (req, res, next) => {
		const db = req.app.get('db');
		const { post_id, user_id } = req.body;
		const newInfo = { post_id, user_id };
		for (const feild of ['post_id', 'user_id'])
			if (!req.body[feild]) {
				return res
					.status(401)
					.json({ error: `Request body must contain ${feild}` });
			}
		ForumService.addTrackerInfo(db, newInfo)
			.then(row => {
				if (!row) {
					return res
						.status(401)
						.json({ error: 'Could not add info to likes tracker.' });
				}
				return res.status(201).json(row);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.delete('/post/deleteFromTracker', (req, res, next) => {
		const db = req.app.get('db');
		const { post_id, user_id } = req.body;
		const infoToDelete = { post_id, user_id };
		console.log(infoToDelete);
		for (const feild of ['post_id', 'user_id'])
			if (!req.body[feild]) {
				return res
					.status(401)
					.json({ error: `Request body must contain ${feild}` });
			}
		ForumService.deleteTrackerInfo(db, infoToDelete)
			.then(rowsAffected => {
				console.log(rowsAffected);
				if (!rowsAffected) {
					return res
						.status(401)
						.json({ error: 'Could not delete from likes tracker.' });
				}
				return res.status(201).json(rowsAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
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
