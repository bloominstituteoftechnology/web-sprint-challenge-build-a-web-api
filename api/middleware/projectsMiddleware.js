const projects = require("../projects/projects-model")

function validateProjectID() {
    return(req, res, next) => {
        projects.get(req.params.id)
        .then((project) => {
            if(project) {
                req.project = project
                next()
            } else {
                res.status(404).json({ error: "That project does not exist"})
            }
        })
    }
}

function validateBeforeAddingProject() {
    return(req, res, next) => {
        const data = req.body
        if(!data) {
            res.status(400).json({error: "You must include changes"})
        } else if(!data.name || !data.description || !data.completed) {
            res.status(400).json({error: "Your request is missing information. Make sure you include a name, a description, and choose wether the project is completed or not"})
        } else {
            req.newProject = data
            next()
        }
    }
}

function verifyRequestBody() {
    return(req, res, next) => {
        if(!req.body) {
            res.status(400).json({error: "you must include the information you would like to change. You can update the name, the description, and / or update wether or not the project is complete"})
        }
        else {
            req.changes = req.body
            next()
        }
    }
}

module.exports = {
    validateProjectID,
    validateBeforeAddingProject,
    verifyRequestBody
}