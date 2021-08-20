// add middlewares here related to projects
const Projects = require("./projects-model");

async function idChecker(req, res, next) {
	try {
		const project = await Projects.get(req.params.id);
		if (!project) {
			next({ status: 404, message: `Id with id ${req.params.id} not found!` });
		} else {
			req.project = project;
			next();
		}
	} catch (err) {
		next(err);
	}
}

module.exports = { idChecker };
