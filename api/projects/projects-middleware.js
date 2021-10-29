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

function validateNewProject(req, res, next) {
  //{name:___, description:____, completed:____}
  const { name, description, completed } = req.body;
  if (!name || name === "" || !description || description === "") {
    res
      .status(400)
      .json({ message: "missing required fields : name, description" });
  } else {
    req.newProject = { name, description, completed };
    next();
  }
}

function validateExistingProject(req, res, next) {
  //{name:___, description:____, completed:____}
  const { name, description, completed } = req.body;
  if (
    !name ||
    name === "" ||
    !description ||
    description === "" ||
    !completed
  ) {
    res.status(400).json({
      message: "missing required fields : name, description, completed",
    });
  } else {
    req.existingProject = { name, description, completed };
    next();
  }
}

module.exports = { validateId, validateNewProject, validateExistingProject };
