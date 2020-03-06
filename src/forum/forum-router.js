const express = require("express");
const path = require("path");
const ForumService = require("./forum-service");
const forumRouter = express.Router();
//forum router
forumRouter
  //get all forum catagories
  .get("/catagories", (req, res, next) => {
    const db = req.app.get("db");
    ForumService.getMessageBoardSections(db)
      .then(sections => {
        if (!sections) {
          return res.status(401).json({
            error:
              "Something went wrong when retrieving message board sections."
          });
        }
        return res.status(200).json(sections);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get all boards
  .get("/messageBoardsX", (req, res, next) => {
    // const db = req.app.get("db");
    // ForumService.getAllMessageBoards(db)
    //   .then(boards => {
    //     if (!boards) {
    //       return res.status(500).json({
    //         error: "Something went wrong when retrieving the message boards."
    //       });
    //     }
    //     return res.status(200).json(boards);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     next(err);
    //});
  })
  //get a message board by id
  .get("/messageboards/get-board/:id", (req, res, next) => {
    const db = req.app.get("db");
    var { id } = req.params;
    id = parseInt(id, 10);
    ForumService.getBoardById(db, id)
      .then(boardName => {
        if (boardName.length === 0) {
          return res.status(200).json({
            error: `There are no boards for that section.`
          });
        }

        return res.status(200).json(boardName);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get a message board's name
  .get("/messageboards/get-board-name/:id", (req, res, next) => {
    const db = req.app.get("db");
    var { id } = req.params;
    id = parseInt(id, 10);
    ForumService.getForumNameById(db, id)
      .then(boardName => {
        if (boardName.length === 0) {
          return res.status(200).json({
            error: `There are no boards for that section.`
          });
        }

        return res.status(200).json(boardName);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get all posts for a message board by id
  .get("/messageboards/get-board-posts/:board_id", (req, res, next) => {
    const db = req.app.get("db");
    var { board_id } = req.params;
    board_id = parseInt(board_id, 10);
    ForumService.getBoardPosts(db, board_id)
      .then(boardPosts => {
        if (boardPosts.length === 0) {
          return res.status(200).json({
            error: `There are no boards for that section.`
          });
        }

        return res.status(200).json(boardPosts);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get the newest 8 posts
  .get("/newestPosts", (req, res, next) => {
    const db = req.app.get("db");
    ForumService.getNewestPosts(db)
      .then(posts => {
        if (!posts) {
          return res
            .state(401)
            .json({ error: "Something went wrong when retriving posts." });
        }
        return res.status(200).json(posts);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get all the posts for a single user
  .get("/get-user-posts/:user_id", (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    const userPosts = [];
    ForumService.getUserPosts(db, user_id)
      .then(posts => {
        if (posts.length < 0) {
          return;
        }
        userPosts.push({ mbPosts: posts });
      })
      .then(() => {
        ForumService.getUserJobListings(db, user_id)
          .then(listings => {
            if (listings.length < 0) {
              return;
            }
            userPosts.push({ jPosts: listings });
          })
          .then(() => {
            ForumService.getUserRentalPosts(db, user_id)
              .then(listings => {
                if (listings.length < 0) {
                  return;
                }
                userPosts.push({ rPosts: listings });
              })
              .then(() => {
                ForumService.getUserMarketPlacePosts(db, user_id)
                  .then(listings => {
                    if (listings.length < 0) {
                      return;
                    }
                    userPosts.push({ mpPosts: listings });
                  })
                  .then(() => {
                    if (userPosts.length < 0) {
                      return res
                        .status(404)
                        .json({ message: "You have no posts." });
                    }
                    return res.status(200).json(userPosts);
                  });
              });
          });
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get the number of threads for a board
  .get("/numOfThreads/:board_id", (req, res, next) => {
    const db = req.app.get("db");
    const { board_id } = req.params;
    ForumService.getNumOfThreads(db, board_id)
      .then(numOfThreads => {
        if (!numOfThreads) {
          return res
            .status(404)
            .json({ error: "Message Board does not exist." });
        }
        return res.status(200).json(numOfThreads);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get a post by id
  .get("/messageboards/get-post-by-id/:id", (req, res, next) => {
    const db = req.app.get("db");
    var { id } = req.params;
    id = parseInt(id, 10);
    ForumService.getPostById(db, id)
      .then(post => {
        if (post.length === 0) {
          return res.status(200).json({
            error: `There are no posts with that id.`
          });
        }

        return res.status(200).json(post);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //get a message board section by id
  .get("/messageboards/:messageboard_section", (req, res, next) => {
    const db = req.app.get("db");
    var { messageboard_section } = req.params;
    messageboard_section = parseInt(messageboard_section, 10);
    ForumService.getBoardsForSection(db, messageboard_section)
      .then(boards => {
        if (boards.length === 0) {
          return res.status(200).json({
            error: `There are no boards for that section.`
          });
        }
        return res.status(200).json(boards);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //search the entire site but term
  .get("/search/posts/:term", (req, res, next) => {
    const db = req.app.get("db");
    var { term } = req.params;
    let posts = [{ siteSearch: true }];
    ForumService.searchAllBoardPosts(db, term)
      .then(mbPosts => {
        if (mbPosts.length === 0) {
          return;
        } else {
          posts.push({ mbPosts: mbPosts });
        }
      })
      .then(() => {
        return ForumService.searchMarketPlace(db, term).then(mpPosts => {
          if (mpPosts.length === 0) {
            return;
          } else {
            posts.push({ mpPosts: mpPosts });
          }
        });
      })
      .then(() => {
        return ForumService.searchRentals(db, term).then(rPosts => {
          if (rPosts.length === 0) {
            return;
          } else {
            posts.push({ rPosts: rPosts });
          }
        });
      })
      .then(() => {
        return ForumService.searchJobs(db, term).then(jPosts => {
          if (jPosts.length === 0) {
            return;
          } else {
            posts.push({ jPosts: jPosts });
          }
        });
      })
      .then(() => {
        if (posts.length === 1) {
          return res
            .status(404)
            .json({ message: `There are no posts with the term '${term}'.` });
        } else {
          return res.status(200).json(posts);
        }
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //search a sepcific message board by term
  .get("/search/posts/:board_id/:term", (req, res, next) => {
    const db = req.app.get("db");
    var { board_id, term } = req.params;
    let board_name;
    ForumService.getForumNameById(db, board_id).then(name => {
      board_name = name.name;
    });
    ForumService.searchBoardPosts(db, board_id, term)
      .then(posts => {
        if (posts.length === 0) {
          return res.status(404).json({
            message: `There are no search results with the term '${term}' in ${board_name}.`
          });
        }

        return res.status(200).json({ specificBoard: posts });
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //check likes tracker if user like post
  .get("/likesTracker/:user_id/:post_id", (req, res, next) => {
    const db = req.app.get("db");
    var { user_id, post_id } = req.params;
    user_id = parseInt(user_id, 10);
    post_id = parseInt(post_id, 10);
    ForumService.getLikesTracker(db, user_id, post_id)
      .then(tracker => {
        if (!tracker) {
          return res
            .status(401)
            .json({ error: "Could not get likes tracker." });
        } else if (tracker === "") {
          return res.status(201).json({ message: "Not content" });
        }
        return res.status(200).json(tracker);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //add post
  .post("/addPost", (req, res, next) => {
    const db = req.app.get("db");
    const { board_id, user_id, title, content, date_posted, likes } = req.body;
    const newPost = { board_id, user_id, title, content, date_posted, likes };
    for (const field of [
      "board_id",
      "user_id",
      "title",
      "content",
      "date_posted"
    ])
      if (!req.body[field]) {
        return res
          .status(401)
          .json({ error: `Must contain ${field} in request body.` });
      }
    ForumService.insertPost(db, newPost)
      .then(post => {
        if (!post) {
          return res.status(401).json({ error: "Could not add your post." });
        }
        return res
          .status(201)
          .location(
            path.posix.join("/messageBoard", `/${post.board_id}`, `/${post.id}`)
          )
          .json(ForumService.serializePost(post));
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //edit post
  .patch("/edit", (req, res, next) => {
    const db = req.app.get("db");
    const { id, board_id, title, content } = req.body;
    const postToUpdate = { id, board_id, title, content };
    const numOfValues = Object.entries(postToUpdate).filter(Boolean).length;
    if (numOfValues === 0) {
      return res.status(401).json({
        error: "Request body must contain title or content."
      });
    }
    ForumService.updatePost(db, postToUpdate)
      .then(post => {
        if (!post) {
          return res.status(401).json({ error: `Post doesn't exists.` });
        }
        res.status(201).json(ForumService.serializePost(post));
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //incremint like on a post
  .patch("/post/addLike/:post_id", (req, res, next) => {
    const db = req.app.get("db");
    const { post_id } = req.params;
    if (!post_id) {
      return res
        .status(401)
        .json({ error: `Request body must conatin post_id.` });
    }
    ForumService.addLike(db, post_id)
      .then(row => {
        if (!row) {
          return res
            .status(401)
            .json({ error: "Could not add a like to the post." });
        }
        return res.status(201).json(row);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //subtract likes from a post
  .patch("/post/minusLike/:post_id", (req, res, next) => {
    const db = req.app.get("db");
    const { post_id } = req.params;
    if (!post_id) {
      return res
        .status(401)
        .json({ error: `Request body must contain post_id.` });
    }
    ForumService.minusLike(db, post_id)
      .then(row => {
        if (!row) {
          return res
            .status(401)
            .json({ error: "Could not minus like to post." });
        }
        return res.status(201).json(row);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //add user and post pairing to like tracker
  .post("/post/addToTracker", (req, res, next) => {
    const db = req.app.get("db");
    const { post_id, user_id } = req.body;
    const newInfo = { post_id, user_id };
    for (const feild of ["post_id", "user_id"])
      if (!req.body[feild]) {
        return res
          .status(401)
          .json({ error: `Request body must contain ${feild}.` });
      }
    ForumService.addTrackerInfo(db, newInfo)
      .then(row => {
        if (!row) {
          return res
            .status(401)
            .json({ error: "Could not add info to likes tracker." });
        }
        return res.status(201).json(row);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //delete user and post paring from tracker
  .delete("/post/deleteFromTracker", (req, res, next) => {
    const db = req.app.get("db");
    const { post_id, user_id } = req.body;
    const infoToDelete = { post_id, user_id };

    for (const field of ["post_id", "user_id"])
      if (!req.body[field]) {
        return res
          .status(401)
          .json({ error: `Request body must contain ${field}.` });
      }
    ForumService.deleteTrackerInfo(db, infoToDelete)
      .then(rowsAffected => {
        if (!rowsAffected) {
          return res
            .status(401)
            .json({ error: "Could not delete from likes tracker." });
        }
        return res.status(201).json(rowsAffected);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  })
  //delete post
  .delete("/posts/:post_id", (req, res, next) => {
    const db = req.app.get("db");
    var { post_id } = req.params;
    post_id = parseInt(post_id);
    ForumService.deletePost(db, post_id)
      .then(rowAffected => {
        if (!rowAffected) {
          return res.status(401).json({ error: `Post doesn't exist.` });
        }
        res.status(201).json(rowAffected);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  });
module.exports = forumRouter;
