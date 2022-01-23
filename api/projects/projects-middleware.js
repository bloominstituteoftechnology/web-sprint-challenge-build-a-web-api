
const Project = require('./projects-model');

async function validateId(req, res, next) {
	try {
		const { id } = req.params;
		const project = await Project.get(id);
		if (project) {
			req.project = project;
			next();
		} else {
			next({
				status: 404,
				message: 'yer trippin'
			});
		}
	} catch (err) {
		next(err);
	}
}

async function validateProject(req, res, next) {
	const { name, description, completed } = req.body;
	if (!name || !name.trim()) {
		res.status(400).json({
			message: 'name is required'
		});
	} else if (!description || !description.trim()) {
		res.status(400).json({
			message: 'description is rewuared'
		});
	} else {
		req.name = name.trim();
		req.description = description.trim();
		req.completed = completed;
		next();
	}
}

module.exports = { validateId, validateProject };