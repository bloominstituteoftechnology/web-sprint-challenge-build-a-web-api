// add middlewares here related to projects
const Project = require('../projects/projects-model');

const validatePost = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      next({
        status: 400,
        message: "missing required field",
      })
    } else {
      next();
    }
};

const validateProjectId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.get(id);
        console.log(project);
        if (project) {
            req.project = project;
            next();
        } else {
            next({
                status: 404,
                message: "project not found",
            })
        }
    } catch (err) {
        next(err);
    }
};

const validateProject = async (req, res, next) => {
    if (!req.body.name || !req.body.description || !req.body.completed) {
        next({
            status: 400,
            message: "missing required field",
        })
    } else {
        next();
    }
}

module.exports = {
    validatePost,
    validateProjectId,
    validateProject
};