const DirectoryService = {
	getAllListings(db) {
		return db
			.select(
				'directory.user_id',
				'users.first_name',
				'users.last_name',
				'users.address',
				'users.city',
				'users.country',
				'users.email',
				'users.phone',
				'users.website'
			)
			.from('directory')
			.innerJoin('users', 'directory.user_id', '=', 'users.id')
			.orderBy('users.last_name', 'asc');
	},
	insertUser(db, newUser) {
		return db
			.into('directory')
			.insert(newUser)
			.returning('*')
			.then(rows => rows[0])
			.innerJoin('users', 'directory.user_id', '=', 'users.id');
	},
	deletedUser(db, user_id) {
		return db
			.from('directory')
			.where({ user_id })
			.delete();
	}
};
module.exports = DirectoryService;
