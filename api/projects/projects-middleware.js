const Projects = require('../projects/projects-model')

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

function validateAction(req, res, next) {
    const  { name, description } = req.body
    if(name && name.trim() && description && description.trim()) {
        req.project = req.body
        next()
    } else {
        next({
            status: 400,
            message: "missing required fields"
        })
    }
}

module.exports = {
    logger,
    handleError,
    actionIdChecker,
    validateAction,
}
