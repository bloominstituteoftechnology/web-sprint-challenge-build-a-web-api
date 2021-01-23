const dbProjects = require("./projects/projects-model");
const dbActions = require("./actions/actions-model");

function validateProjectId(req, res, next) {
  const { id } = req.params;
  dbProjects.get(id).then((project) => {
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  });
}

function validateActionId(req, res, next) {
  const { id } = req.params;
  dbActions.get(id).then((action) => {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  });
}

module.exports = {
  validateProjectId,
  validateActionId,
};
