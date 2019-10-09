const DirectoryService = {
	getAllListings(db) {
		return db
			.select(
				'directory.userid',
				'users.firstname',
				'users.lastname',
				'users.address',
				'users.city',
				'users.country',
				'users.email',
				'users.phone',
				'users.website'
			)
			.from('directory')
			.innerJoin('users', 'directory.userid', '=', 'users.id')
			.orderBy('users.lastname', 'asc');
	},
	insertUser(db, newUser) {
		return db
			.into('directory')
			.insert(newUser)
			.returning('*')
			.then(rows => rows[0])
			.innerJoin('users', 'directory.userid', '=', 'users.id');
	},
	deletedUser(db, userid) {
		return db
			.from('directory')
			.where({ userid })
			.delete();
	}
};
module.exports = DirectoryService;
