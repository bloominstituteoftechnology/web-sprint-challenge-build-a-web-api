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
        next(err)
        }
    }


function validateProject(req, res, next) {
    const { name, desciption } = req.body
    if(!name || !name.trim() || !desciption || !desciption.trim()) {
        res.status(400).json({
            message: "missing required field of name and description"
        })
    } else {
        req.name = name.trim()
        req.desciption = desciption.trim()
        next()
    }
}

function validatePorjectWithComplete(req, res, next) {
    const {name, desciption, completed} = req.body
    if(!name || !name.trim() || !desciption || !desciption.trim() || !completed ) {
        res.status(400).json({
            message: "missing required fields"
        })
    } else {
        req.name = name.trim()
        req.desciption = desciption.trim()
        req.completed = completed
        next()
    }
}


module.exports = {
    validateProjectId,
    logger,
    validateProject,
    validatePorjectWithComplete
}