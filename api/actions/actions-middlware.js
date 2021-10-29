const Action = require("./actions-model");
const Project = require("../projects/projects-model");
// add middlewares here related to actions
async function validateId(req, res, next) {
  console.log("---------validateId middleware");
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

async function validateAction(req, res, next) {
  console.log("---------validateAction middleware");
  const { project_id, description, notes } = req.body;

  if (
    !project_id ||
    typeof project_id === "number" ||
    !description ||
    description.trim() === "" ||
    !notes ||
    notes.trim() === ""
  ) {
    res.status(400).json({
      message: "missing required field, project_id, description, or notes",
    });
  } else {
    req.action = { project_id, description, notes };
    next();
  }
}

async function validateProject(req, res, next) {
  const { project_id } = req.body;
  if ((await Project.get(project_id)) !== null) {
    res.status(404).json({
      message: "project_id not found",
    });
  } else {
    next();
  }
}

module.exports = { validateId, validateAction };
