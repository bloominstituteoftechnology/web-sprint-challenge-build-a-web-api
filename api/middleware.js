const Project = require('./projects/projects-model')
const Action = require('./actions/actions-model')

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

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            next({
                status: 404,
                message: 'action not found'
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding action'
        })
    }
}

async function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body
    if (!project_id || !project_id) {
        res.status(400).json({
            message: 'missing required project id'
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: 'missing required description field'
        })
    } else if (!notes || !notes.trim()) {
        res.status(400).json({
            message: 'missing required notes field'
        })
    }
    else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }

}

module.exports = {
    logger,
    validateProjectId,
    validateProject,
    validateActionId,
    validateAction
}
