const Projects = require('../projects/projects-model');
const Actions = require('../actions/actions-model');


const validateProjectData = (req, res, next) => {
	const project = req.body;

	if (!project.name || !project.description) {
		res.status(400).json({ message: 'Please provide a name and description' })
	} else {
		next();
	}
};

const validateProjectId = (req, res, next) => {
	const { id } = req.params;

	Projects.get(id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ message: "Project not found. Plese provide a valid id." })
			} else {
				next();
			}
		})
		.catch(() => serverError);
};

const validateActionData = (req, res, next) => {
	const action = req.body;

	if (!action.project_id || !action.description || !action.notes) {
		res.status(400).json({ message: 'Please provide project id, description, and notes.' })
	} else {
		next();
	}
};

const validateActionId = (req, res, next) => {
	const { id } = req.params;

	Actions.get(id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ message: "Action not found. Plese provide a valid id." })
			} else {
				next();
			}
		})
		.catch(() => serverError);
};

const validateProjectIdForAction = (req, res, next) => {
	const id = req.body.project_id;
	
	Projects.get(id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ message: "Project not found. Plese provide a valid id." })
			} else {
				next();
			}
		})
		.catch(() => serverError);
};

const serverError = (req, res) => {
	res.status(500).json({ message: "There was a server error with your request." })
};

module.exports = {
	serverError,
	validateProjectData,
	validateProjectId,
	validateActionData,
	validateActionId,
	validateProjectIdForAction
};