// add middlewares here related to projects
const Projects = require('../projects/projects-model');

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message
    })
}

function validateID (req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project
        next()
      } else {
        next({ status: 404, message: 'Project not found'})
      }
    })
    .catch(next)
}

module.exports = {
    handleError,
    validateID
}