// add middlewares here related to actions
const Actions = require('../actions/actions-model')

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message
  })
}

function validateID (req, res, next) {
Actions.get(req.params.id)
  .then(action => {
    if (action) {
      req.action = action
      next()
    } else {
      next({ status: 404, message: 'Project not found'})
    }
  })
  .catch(next)
}

function validatePost (req, res, next) {
  const { description, notes } = req.body
  if (!description) {
    next({status: 400, message: 'Description is missing'})
  } else if (description.trim().length > 128) {
    next({status: 400, message: 'Description is limited to 128 chars'})
  } else if (!notes) {
    next({status: 400, message: 'Use notes to explain how to complete the action'})
  } else {
    next()
  }
}

module.exports = {
  handleError,
  validateID,
  validatePost
}