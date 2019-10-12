const DirectoryService = {
	getAllListings(db) {
		return db.from('directory').orderBy('last_name', 'asc');
	},
	insertListing(db, newListing) {
		return db
			.into('directory')
			.insert(newListing)
			.returning('*')
			.then(rows => rows[0]);
	},
	deletedListing(db, id) {
		return db
			.from('directory')
			.where({ id })
			.delete();
	},
	sortDirectory(db, column, sort) {
		return db('directory').orderBy(column, sort);
	}
};
module.exports = DirectoryService;
