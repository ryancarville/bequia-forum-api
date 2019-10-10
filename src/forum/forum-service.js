const xss = require('xss');
const knex = require('knex');
const ForumService = {
	getMessageBoardSections(db) {
		return db.select('*').from('messageboard_sections');
	},
	getAllMessageBoards(db) {
		return db.from('messageboards');
	},
	getAllMessageBoardPosts(db) {
		return db
			.table('users')
			.join('messageboard_posts', 'messageboard_posts.userid', '=', 'users.id')
			.orderBy('dateposted', 'desc');
	},
	getNewestPosts(db) {
		return db
			.select(
				'messageboard_posts.id',
				'messageboard_posts.boardid',
				'messageboard_posts.title',
				'messageboard_posts.content',
				'messageboard_posts.dateposted',
				'messageboard_posts.likes',
				'users.username'
			)
			.from('messageboard_posts')
			.orderBy('dateposted', 'desc')
			.limit(8)
			.innerJoin('users', 'messageboard_posts.userid', '=', 'users.id');
	},
	getSpecificBoardPosts(db, boardid) {
		return db
			.from('messageboard_posts')
			.where({ boardid })
			.join('messageboard_posts', 'messageboard_posts.userid', '=', 'users.id')
			.orderBy('dateposted', 'desc');
	},
	insertPost(db, newPost) {
		return db
			.into('messageboard_posts')
			.insert(newPost)
			.returning('*')
			.then(rows => rows[0]);
	},
	updatePost(db, updatedPost) {
		return db
			.into('messagebaord_posts')
			.where({ id: updatedPost.id })
			.update(updatedPost);
	},
	deletePost(db, id) {
		return db
			.from('messageboard_posts')
			.where({ id })
			.delete();
	},
	addLike(db, id) {
		return db('messageboard_posts')
			.where({ id })
			.increment('likes', '1')
			.returning('*')
			.then(rows => rows[0]);
	},
	subtractLike(db, id) {
		return db('messageboard_posts')
			.where({ id })
			.decrement('likes', '1')
			.returning('*')
			.then(rows => rows[0]);
	},
	serializePost(newPost) {
		return {
			id: newPost.id,
			boardId: newPost.boardId,
			userId: newPost.userId,
			title: xss(newPost.title),
			content: xss(newPost.content),
			dateposted: newPost.dateposted,
			likes: newPost.likes
		};
	}
};
module.exports = ForumService;
