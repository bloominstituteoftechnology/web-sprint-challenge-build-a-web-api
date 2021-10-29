const Actions = require('./actions-model')
const { actSchema } = require("./../schemas")

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

async function checkCompleted(req, res, next) {
    try {
        const validate = await actSchema.validate(req.body, {
            strict: false,
            stripUnknown: true,
        })
        req.body = validate
        next()
    } catch (err) {
        next({ status: 400, message: err.message })
    }
}

module.exports = {
    handleError,
    checkActionId,
    checkCompleted,
}
