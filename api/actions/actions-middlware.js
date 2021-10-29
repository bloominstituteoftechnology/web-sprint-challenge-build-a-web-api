const Action = require("./actions-model");
const Project = require("../projects/projects-model");

async function validateId(req, res, next) {
  const { id } = req.params;
  const action = await Action.get(id);
  if (!action) {
    res.status(404).json({
      message: `${id} not found`,
    });
  } else {
    req.action = action;
    next();
  }
}

async function validateNewAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (
    !project_id ||
    typeof project_id !== "number" ||
    !description ||
    description.trim() === "" ||
    !notes ||
    notes.trim() === ""
  ) {
    res.status(400).json({
      message: "missing required field, project_id, description, or notes",
    });
  } else {
    req.newAction = { project_id, description, notes, completed };
    next();
  }
}

async function validateProject(req, res, next) {
  const { project_id } = req.body;
  const project = await Project.get(project_id);
  if (!project) {
    res.status(404).json({
      message: "project_id not found",
    });
  } else {
    next();
  }
}

module.exports = {
  validateId,
  validateNewAction,
  validateProject,
};
