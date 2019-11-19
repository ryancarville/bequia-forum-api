const xss = require("xss");

const JobsService = {
  getAllJobCats(db) {
    return db.select("*").from("job_cats");
  },
  getAllJobs(db) {
    return db
      .select("*")
      .from("jobs")
      .orderBy("date_posted", "desc");
  },
  getJobListingsByCat(db, job_cat) {
    return db.from("jobs").where({ job_cat });
  },
  getJobWithId(db, id) {
    return db
      .select("*")
      .from("jobs")
      .where({ id })

      .first();
  },
  insertJob(db, newJob) {
    return db
      .into("jobs")
      .insert(newJob)
      .returning("*")
      .then(rows => rows[0]);
  },
  updateJob(db, updatedJob) {
    return db
      .from("jobs")
      .where({ id: updatedJob.id })
      .update(updatedJob);
  },
  sortJobs(db, column, sort) {
    return db("jobs").orderBy(column, sort);
  },
  sortJobsByEmployment(db, sort) {
    return db("jobs")
      .where({ employment: sort })
      .orderBy("date_posted", "desc");
  },
  deleteJob(db, id) {
    return db
      .from("jobs")
      .where({ id })
      .delete();
  },
  serializeJob(job) {
    return {
      id: job.id,
      jobCat: job.job_cat,
      user_id: job.user_id,
      title: xss(job.title),
      description: xss(job.description),
      location: xss(job.location),
      employment: job.employment,
      contact_name: job.contact_name,
      contact_email: job.contact_email,
      contact_phone: job.contact_phone,
      dateposted: job.date_posted
    };
  }
};

module.exports = JobsService;
