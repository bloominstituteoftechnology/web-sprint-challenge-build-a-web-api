const actions = require("../actions/actions-model")
const projects = require("../projects/projects-model")

function logger() {
    return (req, res, next) => {
        const time = new Date().toISOString()
        console.log(`${time} ${req.method} ${req.url}`)
        next()
    }
}

function validateActionsId() {
    return (req, res, next) => {
        actions.get(req.params.id)
            .then((action) => {
                if (action) {
                    req.action = action
                    next()
                } else {
                    res.status(404).json({
                        message: "action not found",
                    })
                }
            })
    }
}

function validateProjectId() {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then((project) => {
                if (project) {
                    req.project = project
                    next()
                } else {
                    res.status(404).json({
                        message: "project not found",
                    })
                }
            })
    }
}

function validateActionBody() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({ message: "missing action data" })
        } if (!req.body.project_id) {
            return res.status(400).json({ message: "missing required field" })
        } if (!req.body.name || !req.body.description) {
            return res.status(400).json({ message: "missing required field" })
        }
        next()
    }
}

function validateProjectBody() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({ message: "missing project data" })
        } else if (!req.body.name || !req.body.description) {
            return res.status(400).json({ message: "missing required field" })
        }
        next()
    }
}



module.exports = { logger, validateActionsId, validateProjectId, validateActionBody, validateProjectBody }