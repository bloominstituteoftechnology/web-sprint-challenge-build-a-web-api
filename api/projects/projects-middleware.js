const Project = require('../projects/projects-model')

async function validateProjectId(req, res, next) { 
    try {
        const { id } = req.params
        const project = await Project.get(id)
        if (project) {
            req.project = project
            next()
        } else {
            next({
                status: 404,
                message: 'project not found'
            })
        }
    } catch (err) {
        next(err)
    }
}

async function validateProject(req, res, next) {
    const { name, description, completed } = req.body
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
        req.completed = completed
        next()
    }
 }

async function validateProjectPut(req, res, next) {
    const { name, description, completed } = req.body
    if ( name && description && completed ) {
        req.name = name
        req.description = description
        req.completed = completed
    } else {
        res.status(400).json({
            message: 'Missing name, description or completed field'
        })
    }

}
 

module.exports = {
    validateProjectId,
    validateProject,
    validateProjectPut
}