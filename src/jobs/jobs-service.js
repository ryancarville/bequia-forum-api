const xss = require('xss');

const JobsService = {
	getAllJobCats(db) {
		return db.select('*').from('bf_job_cats');
	},
	getAllJobs(db) {
		return db
			.from('bf_jobs')
			.innerJoin('bf_users', 'bf_jobs.userid', '=', 'bf_users.id')
			.orderBy('dateposted', 'desc');
	},
	getJobsInCat(db, catId) {
		return db
			.select('*')
			.from('bf_jobs')
			.where({ jobcat: catId });
	},
	getJobWithId(db, id) {
		return db
			.from('bf_jobs')
			.where({ id })
			.first();
	},
	insertJob(db, newJob) {
		return db
			.into('bf_jobs')
			.insert(newJob)
			.returning('*')
			.then(rows => rows[0]);
	},
	updateJob(db, updatedJod) {
		return db
			.from('bf_jobs')
			.where({ id: updatedJod.id })
			.update(updatedJod);
	},
	deleteJob(db, id) {
		return db
			.from('bf_jobs')
			.where({ id })
			.delete();
	},
	serializeJob(job) {
		return {
			id: job.id,
			jobCat: job.jobCat,
			userid: job.userid,
			title: xss(job.title),
			description: xss(job.description),
			location: xss(job.location),
			employment: job.employment,
			dateposted: job.dateposted
		};
	}
};

module.exports = JobsService;
