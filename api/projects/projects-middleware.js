// add middlewares here related to projects
const Project = require('./projects-model');

function logger(req, res, next) {
    const timeStamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timeStamp}] ${method} ${url}`)
    next()
}

async function validateProjectId(req, res, next) {
    try{ 
        const proj = await Project.get(req.params.id)
            if(!proj) {
                res.status(404).json({
                    message: "project ID not found"
                })
            } else {
                req.proj = proj
                next()
            }

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    validateProjectId,
    logger,
}