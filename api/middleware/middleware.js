const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')

async function validateActionsId(req, res, next) {
    const { id } = req.params
    try {
        const action = await Actions.get(id)
        if(!action) {res.status(404).json({ message: `action with ID ${id} not found` })
    } else {
        req.action = action
        next()
    }
} catch (err) {res.status(500).json({ message: 'action retrieval error:', err })
  }  
}

function validateActions(req, res, next) {
    if (!req.body.description) {
        res.status(400).json({ message: 'description required' })
    } else {
        next()
    }
}

async function validateProjectsId(req, res, next) {
    const { id } = req.params
    try {
        const project = await Projects.get(id)
        if (!project) {res.status(404).json({ message: `project ID ${id} not found` })
    } else {
        req.project = project
        next()
    }
    } catch (err) {res.status(500).json({ message: 'unable to retrieve projects: ', err })
        }
}

function validateProjects(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'user requires both name and description' })
    } else {
        next()
    }
}

module.exports = { validateActionsId, validateActions, validateProjectsId, validateProjects }