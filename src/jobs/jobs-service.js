const xss = require('xss');

const JobsService = {
	getAllJobCats(db) {
		return db.select('*').from('job_cats');
	},
	getAllJobs(db) {
		return db
			.select('*')
			.from('jobs')
			.orderBy('date_posted', 'desc');
	},
	getJobsInCat(db, catId) {
		return db
			.select('*')
			.from('jobs')
			.where({ job_cat: catId });
	},
	getJobWithId(db, id) {
		return db
			.from('jobs')
			.where({ id })
			.first();
	},
	insertJob(db, newJob) {
		return db
			.into('jobs')
			.insert(newJob)
			.returning('*')
			.then(rows => rows[0]);
	},
	updateJob(db, updatedJob) {
		return db
			.from('jobs')
			.where({ id: updatedJob.id })
			.update(updatedJob);
	},
	deleteJob(db, id) {
		return db
			.from('jobs')
			.where({ id })
			.delete();
	},
	serializeJob(job) {
		return {
			id: job.id,
			jobCat: job.job_cat,
			userid: job.user_id,
			title: xss(job.title),
			description: xss(job.description),
			location: xss(job.location),
			employment: job.employment,
			dateposted: job.date_posted
		};
	}
};

module.exports = JobsService;
