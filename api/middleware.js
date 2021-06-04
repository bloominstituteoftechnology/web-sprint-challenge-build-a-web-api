const Project = require('./projects/projects-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] [${method}] to ${url}`)
    next()
  }

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            next({
                status: 404,
                message: 'project not found'
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding project'
        })
    }
}

async function validateProject(req, res, next) {
    const { name, description } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({
            message: 'missing required name field'
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: 'missing required description field'
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}



module.exports = {
    logger,
    validateProjectId,
    validateProject
}