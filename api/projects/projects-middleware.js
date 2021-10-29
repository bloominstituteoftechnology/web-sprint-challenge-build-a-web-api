const Projects = require('../projects/projects-model')
const { actionSchema } = require("./../schemas")

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`)
    next()
}

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        productionMessage: "Sorry, there was a problem!",
    })
}

async function actionIdChecker(req, res, next) {
    try{
        const action = await Projects.get(req.params.id)
        if(!action) {
            next ({
                status: 404,
                message: "project not found",
            })
        } else {
            next()
        }
    } catch (err){
        next(err)
    }
}

async function validateAction(req, res, next) {
    try{
        const validated = await actionSchema.validate(req.body, {
            strict: false,
            stripUnknown: true,
        })
        req.body = validated
        next()
    } catch (err) {
        next({ status: 400, message: err.message })
    }
}

module.exports = {
    logger,
    handleError,
    actionIdChecker,
    validateAction,
}
