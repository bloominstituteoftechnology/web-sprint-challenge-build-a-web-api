function logger(req, res, next) {
	console.log(`[${new Date().toLocaleString()}] [${req.method}] ${req.path}`);
	next();
}

function validateProject(req, res, next) {
	const { name, description } = req.body;
	if (!name || !name.trim() || !description || !description.trim()) {
		res.status(400).json({ message: 'missing required name and/or description field' });
	} else {
		req.name = name.trim();
		req.description = description.trim();
		next();
	}
}

function validateAction(req, res, next) {
	const { project_id, description, notes } = req.body;
	if (!project_id || !description || !description.trim() || !notes || !notes.trim()) {
		res.status(400).json({ message: 'missing required project_id, notes, and/or description field' });
	} else {
		req.project_id = req.body.project_id;
		req.description = description.trim();
		req.notes = notes.trim();
		next();
	}
}

// do not forget to expose these functions to other modules
module.exports = {
	logger,
	validateAction,
	validateProject
};
