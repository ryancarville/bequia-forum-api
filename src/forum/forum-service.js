const xss = require('xss');

const ForumService = {
	getMessageBoardSections(db) {
		return db.select('*').from('bf_messageboard_sections');
	},
	getAllMessageBoards(db) {
		return db.select('*').from('bf_messageboards');
	},
	getAllMessageBoardPosts(db) {
		return db.select('*').from('bf_messageboard_posts');
	},
	getSpecificBoardPosts(db, boardid) {
		return db
			.select('*')
			.from('bf_messageboard_posts')
			.where({ boardid });
	},
	insertPost(db, newPost) {
		return db
			.into('bf_messageboard_posts')
			.insert(newPost)
			.returning('*')
			.then(rows => rows[0]);
	},
	deletePost(db, id) {
		return db
			.from('bf_messageboard_posts')
			.where({ id })
			.delete();
	},
	serializePost(newPost) {
		return {
			id: newPost.id,
			boardId: newPost.boardId,
			userId: newPost.userId,
			title: xss(newPost.title),
			content: xss(newPost.content),
			date: newPost.date,
			likes: newPost.likes
		};
	}
};
module.exports = ForumService;
