const Project = require("../projects/projects-model");

const validateProjectId = async (req, res, next) => {
  try {
    const project = await Project.getById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "project not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateProject = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "missing project data" });
  } else if (!req.body.description || !req.body.description.trim()) {
    res.status(400).json({ message: "missing required description field" });
  } else if (!req.body.name || !req.body.name.trim()) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
};

module.exports = {
  validateProjectId,
  validateProject,
};
