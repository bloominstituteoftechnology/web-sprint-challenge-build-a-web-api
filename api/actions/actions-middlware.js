// add middlewares here related to actions
const Actions = require('../actions/actions-model')

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      prodMessage: 'Theres an error and this handles it',
    })
}

module.exports = {
    handleError
}