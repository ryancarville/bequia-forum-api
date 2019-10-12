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
	.get('/listings/:id', (req, res, next) => {
		const db = req.app.get('db');
		const { id } = req.params;
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
	.get('/sort/:column/:sortType', (req, res, next) => {
		const db = req.app.get('db');
		const { column, sortType } = req.params;
		if (column === 'employment') {
			const temp = sortType.split('%20');
			const employType = temp.join(' ');
			JobsService.sortJobsByEmployment(db, employType)
				.then(jobs => {
					console.log(jobs);
					if (!jobs) {
						return res.status(404).json({
							message: `There are no current ${sortType} job listings.`
						});
					}

					return res.status(200).json(jobs);
				})
				.catch(err => {
					console.log(err);
					next(err);
				});
		} else {
			JobsService.sortJobs(db, column, sortType)
				.then(jobs => {
					if (!jobs) {
						return res
							.status(401)
							.json({ error: 'Something went wrong sorting the directory.' });
					}
					return res.status(200).json(jobs);
				})
				.catch(err => {
					console.log(err);
					next(err);
				});
		}
	})
	.post('/addJob', (req, res, next) => {
		const db = req.app.get('db');
		const {
			user_id,
			job_cat,
			title,
			location,
			description,
			contact_name,
			contact_email,
			website,
			contact_phone,
			employment,
			date_posted
		} = req.body;
		const newJob = {
			user_id,
			job_cat,
			title,
			location,
			description,
			contact_name,
			contact_email,
			website,
			contact_phone,
			employment,
			date_posted
		};
		for (const feild of [
			'job_cat',
			'user_id',
			'title',
			'description',
			'location',
			'employment',
			'date_posted'
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
		const {
			id,
			user_id,
			job_cat,
			title,
			location,
			description,
			contact_name,
			contact_email,
			website,
			contact_phone,
			employment,
			date_posted
		} = req.body;
		const jobToUpdate = {
			id,
			user_id,
			job_cat,
			title,
			location,
			description,
			contact_name,
			contact_email,
			website,
			contact_phone,
			employment,
			date_posted
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
				return res.status(201).json(numRowsAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.delete('/delete/:id', (req, res, next) => {
		const db = req.app.get('db');
		const { id } = req.params;
		JobsService.deleteJob(db, id)
			.then(rowAffected => {
				if (!rowAffected) {
					return res.status(401).json({ error: 'No job with that id exists.' });
				}
				return res.status(201).json(rowAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});
module.exports = jobsRouter;
