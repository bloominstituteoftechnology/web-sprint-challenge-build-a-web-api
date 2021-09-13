// add middlewares here related to projects
const Project = require('../projects/projects-model');

function logger(req, res, next) {
    const timeStamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;
    console.log(`[${timestamp}] ${method} to ${url}`);
    next();
}

async function validateProjectId(req, res, next) {
    try {
      const project = await Project.get(req.params.id);
      if (!project) {
        next({ status: 404, message: "project not found" });
      } else {
        req.project = project;
        next();
      }
    } catch (err) {
      res.status(500).json({ message: "problem finding project" });
    }
  }

  function validateProject(req, res, next) {
    Project.insert(req.body)
        .then(project => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({
                  message: 'missing required name and description field'
                });
              } else {
                  res.status(201).json(project);
              }
        })
        .catch(next);
  }

module.exports = {
    validateProject,
    validateProjectId,
    logger,
}