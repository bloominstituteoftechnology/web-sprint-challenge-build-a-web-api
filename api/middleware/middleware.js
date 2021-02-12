const { as } = require("../../data/dbConfig");
const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

async function validateActionId(req, res, next) {
  const id = req.params.id;
  try {
    const action = await Actions.getbyId(id);
    if (!action) {
      res.status(400).json({ message: `No action with Id:${id}` });
    } else {
      req.actions = action;
      next();
    }
  } catch (error) {
    res.status(500).json(`Server Error: ${error}`);
  }
}
async function validateActionBody(req, res, next) {
  const { project_id, description, notes } = req.body;
  try {
    if (!project_id || !description || !notes) {
      res
        .status(400)
        .json({
          message: `New action must contain all of the following. project_id,description, and notes`,
        });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error}` });
  }
}
async function validateProjectId(req, res, next) {
  const id = req.params.id;
  try {
    const project = await Projects.getbyId(id);
    if (!project) {
      res.status(400).json({ message: `No project with Id:${id}` });
    } else {
      req.projects = project;
      next();
    }
  } catch (error) {
    res.status(500).json(`Server Error: ${error}`);
  }
}

async function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      res
        .status(400)
        .json({
          message: `New projects must contain all of the following: name, description`,
        });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error}` });
  }
}
module.exports = {
  validateActionId,
  validateActionBody,
  validateProjectId,
  validateProjectBody,
};
