// Write your "projects" router here!


const express = require('express');

const Projects = require('./projects-model');
const mw = require('../middleware/middleware');

const router = express.Router();


router.get('/', (req, res) => {
	Projects.get()
		.then(data => res.status(200).json(data))
		.catch(() => mw.serverError);

});


router.get('/:id', (req, res) => {
	const { id } = req.params;
	
	Projects.get(id)
	.then((data) => {
		if (!data) {
			res.status(404).json({message: "Project not found. Please provide a valid id." })
		} else {
			res.status(200).json(data)
		}
	})
		.catch(() => mw.serverError);

});


router.post('/', mw.validateProjectData, (req, res) => {
	Projects.insert(req.body)
		.then((data) => res.status(201).json(data))
		.catch(() => mw.serverError);
});


router.put('/:id', mw.validateProjectData, mw.validateProjectId, (req, res) => {
	const { id } = req.params;
	
	Projects.update(id, req.body)
		.then((data) => res.status(200).json(data))
		.catch(() => mw.serverError);
});


router.delete('/:id', mw.validateProjectId, (req, res) => {
	const { id } = req.params;

	Projects.remove(id)
		.then((data) => res.status(200).json(data))
		.catch(() => mw.serverError);
});


router.get('/:id/actions', mw.validateProjectId, (req, res) => {
	const { id } = req.params;

	Projects.getProjectActions(id)
		.then((data) => res.status(200).json(data))
		.catch(() => mw.serverError);
});


module.exports = router;