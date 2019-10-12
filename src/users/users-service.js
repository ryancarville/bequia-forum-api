const UserService = {
	getUserData(db, id) {
		return db('users')
			.select('user_name', 'first_name', 'last_name', 'last_login')
			.where({ id })
			.first();
	}
};
module.exports = UserService;
