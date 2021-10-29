const Actions = require('./actions-model')

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        productionMessage: "Sorry, there was a problem!",
    })
}

async function checkActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            next({ status: 404, message: "id was not found"})
        } else {
            req.actionById = action
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleError,
    checkActionId,
}
