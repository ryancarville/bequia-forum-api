const app = require("../src/app");
const db = require("../src/server");

describe("All market place endpoints", () => {
  it("Responds 200 and gets all market place catagories", () => {
    return supertest(app)
      .get("/rentals/catagories")
      .send(db)
      .expect(200);
  });
  it("Responds with 200 and gets all listings for catagory", () => {
    const rental_cat = "2";
    return supertest(app)
      .get(`/rentals/listings-by-cat/${rental_cat}`)
      .send(db)
      .expect(200);
  });
  it("Responds with 200 and gets listing by id", () => {
    const id = 2;
    return supertest(app)
      .get(`/rentals/listings/${id}`)
      .send(db)
      .expect(200);
  });
  it("Responds with 201 and post new listing", () => {
    const newListing = {
      market_place_cat: 2,
      user_id: 2,
      title: "New Title",
      description: "description",
      location: "Test location",
      price: "20.02",
      contact_name: "test name",
      contact_email: "test@email.com",
      contact_phone: "41039201834",
      date_posted: "2019-12-10"
    };
    return supertest(app)
      .post(`/rentals/addListing`)
      .send(db)
      .send(newListing)
      .expect(201);
  });
  it("Responds with 201 and patches listing", () => {
    const updateListing = {
      id: 2,
      market_place_cat: 2,
      user_id: 2,
      title: "New Title",
      description: "description",
      location: "Test location",
      price: "20.02",
      contact_name: "test name",
      contact_email: "test@email.com",
      contact_phone: "41039201834",
      date_posted: "2019-12-10"
    };
    return supertest(app)
      .patch(`/rentals/edit`)
      .send(db)
      .send(updateListing)
      .expect(201);
  });
  it("Responds with 204 and deletes job", () => {
    const listingId = 1;
    return supertest(app)
      .delete(`/rentals/delete/${listingId}`)
      .expect(201);
  });
});
