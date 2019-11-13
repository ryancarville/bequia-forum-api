const xss = require('xss');
const CommentsService = {
	getComments(db) {
		return db
			.select(
				'comments.id',
				'comments.user_id',
				'comments.post_id',
				'comments.content',
				'comments.date_posted',
				'users.first_name',
				'users.last_name',
				'users.user_name'
			)
			.from('comments')
			.innerJoin('users', 'comments.user_id', '=', 'users.id')
			.orderBy('comments.date_posted', 'desc');
	},
	getCommentsByPostId(db, post_id) {
		return db
			.from('comments')
			.where({ post_id })
			.orderBy('comments.date_posted', 'desc');
	},
	insertComment(db, newComment) {
		return db
			.insert(newComment)
			.into('comments')
			.returning('*')
			.then(rows => rows[0]);
	},
	deleteComment(db, id) {
		return db('comments')
			.where({ id })
			.delete();
	},
	countCommentsForPost(db, post_id) {
		return db
			.count('id')
			.from('comments')
			.where({ post_id });
	},
	serializeComment(comment) {
		return {
			id: comment.id,
			postid: comment.post_id,
			userid: comment.user_id,
			content: xss(comment.content),
			dateposted: comment.date_posted
		};
	}
};
module.exports = CommentsService;
