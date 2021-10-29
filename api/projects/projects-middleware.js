// add middlewares here related to projects
const Project = require("./projects-model");

async function validateId(req, res, next) {
  const { id } = req.params;
  const project = await Project.get(id);
  if (!project) {
    res.status(404).json({
      message: `project ${id} not found`,
    });
  } else {
    req.project = project;
    next();
  }
}

module.exports = { validateId };
