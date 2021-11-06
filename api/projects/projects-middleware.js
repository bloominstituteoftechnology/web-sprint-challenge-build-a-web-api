// add middlewares here related to projects
const Projects = require('../projects/projects-model');

function handleError(err, req, res) {
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

function validatePost (req, res, next) {
  const { name, description } = req.body
  if (!name) {
    next({ status: 400, message: 'Missing name'})
  } else if (!description) {
    next({ status: 400, message: 'Missing description'})
  } else {
    next()
  }
}

function validateUpdatedPost (req, res, next) {
  const { name, description, completed } = req.body
  if (!name) {
    next({ status: 400, message: 'Missing name'})
  } else if (!description) {
    next({ status: 400, message: 'Missing description'})
  } else if (completed === undefined ) {
    next({ status: 400, message: 'Project completion status is missing'})
  } else {
    next()
  }
}

module.exports = {
    handleError,
    validateID,
    validatePost,
    validateUpdatedPost
}