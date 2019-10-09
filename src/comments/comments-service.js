const xss = require('xss');
const CommentsService = {
	getAllComments(db) {
		return db
			.select(
				'comments.id',
				'comments.userid',
				'comments.postid',
				'comments.content',
				'comments.dateposted',
				'users.firstname',
				'users.lastname',
				'users.username'
			)
			.from('comments')
			.innerJoin('users', 'comments.userid', '=', 'users.id')
			.orderBy('comments.dateposted', 'desc');
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
	serializeComment(comment) {
		return {
			id: comment.id,
			postid: comment.postid,
			userid: comment.userid,
			content: xss(comment.content),
			dateposted: comment.dateposted
		};
	}
};
module.exports = CommentsService;
