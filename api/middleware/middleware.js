const Action = require('../actions/actions-model');
const Project = require('../projects/projects-model');

async function validateActionsId(req, res, next) {
  const { id } = req.params;
  try {
    const action = await Action.get(id);
    if (!action) {
      res.status(404).json({
        message: `Action with the ID ${id} does not exist`,
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Could not Retrieve Actions',
    });
  }
}

function validateActions(req, res, next) {
  if (!req.body.description) {
    res.status(400).json({
      message: 'Description is Require',
    });
  } else {
    next();
  }
}

async function validateProjectsId(req, res, next) {
  const { id } = req.params;
  try {
    const project = await Project.get(id);
    if (!project) {
      res.status(404).json({
        message: `Project with the ID ${id} does not exist`,
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Could not Retrieve Projects',
    });
  }
}

function validateProjects(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: 'Name and Description is Require',
    });
  } else {
    next();
  }
}

module.exports = {
  validateActionsId,
  validateActions,
  validateProjectsId,
  validateProjects,
};
