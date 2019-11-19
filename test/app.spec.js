const app = require("../src/app");
const db = require("../src/server");
describe("Forum API", () => {
  it("GET /forum/catagories responds with 200 containing all forum section titles", () => {
    const sections = [
      { id: 1, name: "Life on Bequia" },
      { id: 2, name: "Help & Tips" },
      { id: 3, name: "Activites" },
      { id: 4, name: "Events" },
      { id: 5, name: "Jobs" },
      { id: 6, name: "Rentals" },
      { id: 7, name: "Marekt Place" },
      { id: 8, name: "Off-Topic" },
      { id: 9, name: "Support" }
    ];

    return supertest(app)
      .get("/forum/catagories")
      .send(db)
      .expect(200, sections);
  });

  it("GET /forum/messageBoards responds with 200 and all messageboard sections", () => {
    return supertest(app)
      .get("/forum/messageBoards")
      .send(db)
      .expect(200);
  });

  it("GET /forum/newestPosts responds with 200 and newest posts", () => {
    return supertest(app)
      .get("/forum/newestPosts")
      .send(db)
      .expect(res => {
        expect(res.body.length).equal(8);
        expect(res.status).equal(200);
      });
  });

  it("GET /forum/numOfThreads/:board_id respond with 200 and number of posts on a board", () => {
    const board_id = 1;
    return supertest(app)
      .get(`/forum/numOfThreads/${board_id}`)
      .send(db)
      .expect(200);
  });

  it("GET /forum/messageboards/get-board/:id responds with 200 and board", () => {
    const id = 1;
    return supertest(app)
      .get(`/forum/messageboards/get-board/${id}`)
      .send(db)
      .expect(200);
  });

  it("GET /forum/messageboards/get-board-name/:id responds with 200 and post", () => {
    const id = 1;
    const name = { name: "Daily Life" };
    return supertest(app)
      .get(`/forum/messageboards/get-board-name/${id}`)
      .send(db)
      .expect(200, name);
  });

  it("GET /forum/messageboards/get-board-posts/:board_id responds 200 and all post on board", () => {
    const board_id = 1;
    return supertest(app)
      .get(`/forum/messageboards/get-board-posts/${board_id}`)
      .send(db)
      .expect(200);
  });

  it("GET /forum/messageboards/get-post-by-id/:id and responds 200 with specific post", () => {
    const id = 20;
    return supertest(app)
      .get(`/forum/messageboards/get-post-by-id/${id}`)
      .send(db)
      .expect(200);
  });
  it("GET /forum/messageboards/:messageboard_section responds with 200 and borad sections", () => {
    const messageboard_section = 2;
    return supertest(app)
      .get(`/forum/messageboards/${messageboard_section}`)
      .send(db)
      .expect(200);
  });
  it("GET /forum/posts responds with 200 and all posts", () => {
    return supertest(app)
      .get(`/forum/posts`)
      .send(db)
      .expect(200);
  });
  it("GET /forum//get-posts-for/:board_id responds with 200 and all posts for board", () => {
    const board_id = 2;
    return supertest(app)
      .get(`/forum/get-posts-for/${board_id}`)
      .send(db)
      .expect(200);
  });
});
