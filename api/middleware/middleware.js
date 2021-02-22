const actions = require("../actions/actions-model")
// const projects = require("../projects/projects-model")

function logger() {
    return (req, res, next) => {
        const time = new Date().toISOString()
        console.log(`${time} ${req.method} ${req.url}`)
        next()
    }
}

function actionsId() {
    return (req, res, next) => {
        actions.findById(req.params.id)
            .then((user) => {
                if (user) {
                    req.user = user
                    next()
                } else {
                    res.status(404).json({
                        message: "action not found",
                    })
                }
            })
    }
}

function validateActions() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({ message: "missing action data" })
        } else if (!req.body.text) {
            return res.status(400).json({ message: "missing required action name field" })
        }
        next()
    }
}

function validateProjects() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({ message: "missing project data" })
        } else if (!req.body.text) {
            return res.status(400).json({ message: "missing required project text field" })
        }
        next()
    }
}

module.exports = { logger, actionsId, validateActions, validateProjects }