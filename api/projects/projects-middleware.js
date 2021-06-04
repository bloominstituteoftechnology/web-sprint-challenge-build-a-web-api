const Project = require("./projects-model");

const checkDatabase = async (req, res, next) => {
	const id = req.params.id;

	try {
		const project = await Project.get(id);
		if (project) {
			req.project = project;
			next();
		} else {
			res.status(404).json({
				message: `Project with id ${id} not found`,
			});
		}
	} catch (err) {
		next(err);
	}
};

const validateProject = (req, res, next) => {
	const { name, description } = req.body;
	if (name && description) {
		next();
	} else {
		res.status(400).json({
			message: "Please provide a name and description",
		});
	}
};

module.exports = {
	checkDatabase,
	validateProject,
};
