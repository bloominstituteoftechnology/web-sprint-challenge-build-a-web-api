const Project = require('./projects-model')

// middleware to get project id from projects database
async function validateProjectId (req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({message: "project not found"})
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        next(err)
    }
}

// middleware to validate required name and description fields for projects
function validateProject (req, res, next) {
    const { name, description } = req.body
    if (!name || !name.trim() || !description || !description.trim()) {
        res.status(400).json({
            message: "missing required field (name or description)"
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}

// middleware to validate required name, description, completed fields for projects
function validateProjectWithCompleted (req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !name.trim() || !description || !description.trim() || !!completed) {
        res.status(400).json({
            message: "missing required field (name, description, or completed)"
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}


module.exports = {
    validateProjectId,
    validateProject,
    validateProjectWithCompleted
}