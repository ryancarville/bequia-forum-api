const app = require("../src/app");
const db = require("../src/server");

describe("Jobs Endpoints", () => {
  it("Respons with 200 and gets all job catagories", () => {
    return supertest(app)
      .get("/jobs/catagories")
      .send(db)
      .expect(200);
  });
  it("Respons with 200 and gets all listings for job catagory", () => {
    const job_cat = "2";
    return supertest(app)
      .get(`/jobs/listings-by-cat/${job_cat}`)
      .send(db)
      .expect(200);
  });
  it("Respons with 200 and gets listing by id", () => {
    const id = "2";
    return supertest(app)
      .get(`/jobs/listings/${id}`)
      .send(db)
      .expect(200);
  });
  it("Respons with 201 and post new job", () => {
    const newJob = {
      user_id: 1,
      job_cat: 2,
      title: "New Job",
      location: "Bequia",
      description: "New description",
      contact_name: "Test name",
      contact_email: "test@email.com",
      website: "www.website.com",
      contact_phone: "+4109481903892",
      employment: "Full Time",
      date_posted: "2019-12-10"
    };
    return supertest(app)
      .post(`/jobs/addJob`)
      .send(db)
      .send(newJob)
      .expect(201);
  });
  it("Respons with 201 and patches new job", () => {
    const updateJob = {
      id: 1,
      user_id: 1,
      job_cat: 2,
      title: "New Job",
      location: "Bequia",
      description: "New description",
      contact_name: "Test name",
      contact_email: "test@email.com",
      website: "www.website.com",
      contact_phone: "+4109481903892",
      employment: "Full Time",
      date_posted: "2019-12-10"
    };
    return supertest(app)
      .patch(`/jobs/edit`)
      .send(db)
      .send(updateJob)
      .expect(201);
  });
  it("Respons with 401 and deletes job", () => {
    const job = 2;
    return supertest(app)
      .delete(`/jobs/delete/${job}`)
      .expect(401);
  });
});
