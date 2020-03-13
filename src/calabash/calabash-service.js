const CalabashService = {
  getEmail(db, email) {
    return db("calabash-guest")
      .where({ email })
      .first();
  }
};
module.exports = CalabashService;
