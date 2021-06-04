// Write your "projects" router here!
const express = require('express');
const { validateProject } = require('../middleware/middleware');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
	Projects.get()
		.then(projects => {
			console.log('PROJECTS: ', projects);
			res.status(200).json(projects);
		})
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	Projects.get(req.params.id)
		.then(project => {
			if (!project) {
				res.status(404);
				next();
			} else {
				console.log('PROJECT: ', project);
				res.status(200).json(project);
			}
		})
		.catch(next);
});

router.post('/', validateProject, (req, res, next) => {
	Projects.insert({ name: req.name, description: req.description, completed: req.body.completed })
		.then(project => {
			console.log('PROJECT: ', project);
			res.json(project);
		})
		.catch(next);
});

router.put('/:id', validateProject, (req, res, next) => {
	Projects.update(req.params.id, req.body)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	const { id } = req.params;
	Projects.get(id)
		.then(project => {
			if (!project) {
				res.status(404);
				next();
			} else {
				return Projects.remove(id);
			}
		})
		.then(deletedProject => {
			res.status(200).json(deletedProject);
		})
		.catch(next);
});

router.get('/:id/actions', (req, res, next) => {
	const { id } = req.params;
	Projects.getProjectActions(id)
		.then(actions => {
			console.log('PROJECT ACTIONS: ', actions);
			res.status(200).json(actions);
		})
		.catch(next);
});

module.exports = router;
