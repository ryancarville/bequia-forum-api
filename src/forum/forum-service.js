const xss = require("xss");
const knex = require("knex");
const ForumService = {
  getMessageBoardSections(db) {
    return db.select("*").from("messageboard_sections");
  },
  getBoardsForSection(db, messageboard_section) {
    return db.from("messageboards").where({ messageboard_section });
  },
  getBoardById(db, id) {
    return db
      .from("messageboards")
      .where({ id })
      .first();
  },
  getForumNameById(db, id) {
    return db
      .select("name")
      .from("messageboards")
      .where({ id })
      .first();
  },
  getAllMessageBoards(db) {
    return db.from("messageboards");
  },
  getNumOfThreads(db, board_id) {
    return db
      .count("board_id")
      .from("messageboard_posts")
      .where({ board_id });
  },
  getAllMessageBoardPosts(db) {
    return db
      .select(
        "messageboard_posts.id",
        "messageboard_posts.user_id",
        "messageboard_posts.board_id",
        "messageboard_posts.title",
        "messageboard_posts.content",
        "messageboard_posts.date_posted",
        "messageboard_posts.likes",
        "users.user_name"
      )
      .from("messageboard_posts")
      .orderBy("date_posted", "desc")
      .innerJoin("users", "messageboard_posts.user_id", "=", "users.id");
  },
  getNewestPosts(db) {
    return db
      .select(
        "messageboard_posts.id",
        "messageboard_posts.user_id",
        "messageboard_posts.board_id",
        "messageboard_posts.title",
        "messageboard_posts.content",
        "messageboard_posts.date_posted",
        "messageboard_posts.likes",
        "users.user_name"
      )
      .from("messageboard_posts")
      .innerJoin("users", "messageboard_posts.user_id", "=", "users.id")
      .orderBy("date_posted", "desc")
      .limit(8);
  },
  getBoardPosts(db, board_id) {
    return db
      .select("*")
      .from("messageboard_posts")
      .where({ board_id })
      .orderBy("desc", "date_posted");
  },
  getPostById(db, id) {
    return db
      .from("messageboard_posts")
      .where({ id })
      .first();
  },
  getSpecificBoardPosts(db, board_id) {
    return db
      .from("messageboard_posts")
      .where({ board_id })
      .join("messageboard_posts", "messageboard_posts.user_id", "=", "users.id")
      .orderBy("date_posted", "desc");
  },
  searchPosts(db, term) {
    return db
      .select("*")
      .from("messageboard_posts")
      .where("title", "ilike", `%${term}%`)
      .orderBy("date_posted", "desc");
  },
  searchAllBoardPosts(db, term) {
    return db
      .select("*")
      .from("messageboard_posts")
      .where("title", "ilike", `%${term}%`);
  },
  searchJobs(db, term) {
    return db
      .select("*")
      .from("jobs")
      .where("title", "ilike", `%${term}%`);
  },
  searchRentals(db, term) {
    return db
      .select("*")
      .from("rentals")
      .where("title", "ilike", `%${term}%`);
  },
  searchMarketPlace(db, term) {
    return db
      .select("*")
      .from("market_place")
      .where("title", "ilike", `%${term}%`);
  },

  searchBoardPosts(db, board_id, term) {
    return db
      .select("*")
      .from("messageboard_posts")
      .where({ board_id })
      .andWhere("title", "ilike", `%${term}%`)
      .orderBy("date_posted", "desc");
  },
  insertPost(db, newPost) {
    return db
      .into("messageboard_posts")
      .insert(newPost)
      .returning("*")
      .then(rows => rows[0]);
  },
  updatePost(db, updatedPost) {
    return db
      .into("messageboard_posts")
      .where({ id: updatedPost.id })
      .update(updatedPost);
  },
  deletePost(db, id) {
    return db
      .from("messageboard_posts")
      .where({ id })
      .delete();
  },
  getLikesTracker(db, user_id, post_id) {
    return db
      .from("likes_tracker")
      .where({ user_id })
      .andWhere({ post_id });
  },
  addLike(db, id) {
    return db("messageboard_posts")
      .where({ id })
      .increment("likes", "1")
      .returning("*")
      .then(rows => rows[0]);
  },
  addTrackerInfo(db, info) {
    return db("likes_tracker")
      .insert(info)
      .returning("*")
      .then(rows => rows[0]);
  },
  minusLike(db, id) {
    return db("messageboard_posts")
      .where({ id })
      .decrement("likes", "1")
      .returning("*")
      .then(rows => rows[0]);
  },
  deleteTrackerInfo(db, info) {
    return db("likes_tracker")
      .where({ user_id: info.user_id, post_id: info.post_id })
      .delete();
  },
  sortPosts(db, column, sort) {
    return db("messageboard_posts").orderBy(column, sort);
  },
  serializePost(newPost) {
    return {
      id: newPost.id,
      boardId: newPost.board_id,
      userId: newPost.user_id,
      title: xss(newPost.title),
      content: xss(newPost.content),
      dateposted: newPost.date_posted,
      likes: newPost.likes
    };
  }
};
module.exports = ForumService;
