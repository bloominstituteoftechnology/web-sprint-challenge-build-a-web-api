const Action = require("./actions-model");
const Project = require("../projects/projects-model");

const checkDatabase = async (req, res, next) => {
	const id = req.params.id;

	try {
		const action = await Action.get(id);
		if (action) {
			req.action = action;
			next();
		} else {
			res.status(404).json({
				message: `Action with id ${id} not found`,
			});
		}
	} catch (err) {
		next(err);
	}
};

const validateAction = async (req, res, next) => {
	const { project_id, description, notes } = req.body;
	if (project_id && description && notes) {
		try {
			const project = await Project.get(project_id);
			if (project) {
				next();
			} else {
				res.status(400).json({
					message: "Please provide an existing project_id",
				});
			}
		} catch (err) {
			next(err);
		}
	} else {
		res.status(400).json({
			message: "Please provide description and notes",
		});
	}
};

module.exports = {
	checkDatabase,
	validateAction,
};
