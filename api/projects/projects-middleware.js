// add middlewares here related to projects
const Projects = require('../projects/projects-model');

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      prodMessage: 'Theres an error and this handles it',
    })
}

module.exports = {
    handleError
}