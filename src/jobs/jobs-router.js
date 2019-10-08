const express = require('express');
const path = require('path');
const JobsService = require('./jobs-service');
const jobsRouter = express.Router();

jobsRouter
	.get('/catagories', (req, res, next) => {
		const db = req.app.get('db');
		JobsService.getAllJobCats(db)
			.then(jobCats => {
				if (!jobCats) {
					return res.status(401).json({
						error: 'Something went wrong when retriving job catagorys.'
					});
				}
				return res.status(200).json(jobCats);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/listings', (req, res, next) => {
		const db = req.app.get('db');
		JobsService.getAllJobs(db)
			.then(jobs => {
				if (!jobs) {
					return res
						.status(401)
						.json({ error: 'There are no jobs in the data base.' });
				}
				return res.status(200).json(jobs);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.get('/listings/:listingId', (req, res, next) => {
		const db = req.app.get('db');
		const id = req.params.listingId;
		JobsService.getJobWithId(db, id)
			.then(job => {
				if (!job) {
					return res
						.status(401)
						.json({ error: 'That job listing does not exists.' });
				}
				return res.status(200).json(JobsService.serializeJob(job));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.post('/addJob', (req, res, next) => {
		const db = req.app.get('db');
		const {
			jobcat,
			userid,
			title,
			description,
			location,
			employment,
			dateposted
		} = req.body;
		const newJob = {
			jobcat,
			userid,
			title,
			description,
			location,
			employment,
			dateposted
		};
		for (const feild of [
			'jobcat',
			'userid',
			'title',
			'description',
			'location',
			'employment',
			'dateposted'
		])
			if (!req.body[feild]) {
				return res
					.status(401)
					.json({ error: `Must contain ${feild} in request body.` });
			}
		JobsService.insertJob(db, newJob)
			.then(job => {
				if (!job) {
					return res
						.status(401)
						.json({ error: 'Could not add job to data base.' });
				}
				return res
					.status(201)
					.location(path.posix.join('/jobs', `/${job.id}`))
					.json(JobsService.serializeJob(job));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch('/edit', (req, res, next) => {
		const db = req.app.get('db');
		const { id, jobcat, title, description, location, employment } = req.body;
		const jobToUpdate = {
			id,
			jobcat,
			title,
			description,
			location,
			employment
		};
		const numOfValues = Object.entries(jobToUpdate).filter(Boolean).length;
		if (numOfValues === 0) {
			return res.status(401).json({
				error:
					'Request body must contain either job catagory, title, description, location or epmployment type.'
			});
		}
		JobsService.updateJob(db, jobToUpdate)
			.then(numRowsAffected => {
				if (!numRowsAffected) {
					return res.status(401).json({ error: 'Could not update jobs.' });
				}
				return res.status(204).json(numRowsAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.delete('/delete/:jobId', (req, res, next) => {
		const db = req.app.get('db');
		const id = req.params.jobId;
		JobsService.deleteJob(db, id)
			.then(rowAffected => {
				if (!rowAffected) {
					return res.status(401).json({ error: 'No job with that id exists.' });
				}
				return res.status(204).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});
module.exports = jobsRouter;
