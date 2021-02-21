const actions = require("../actions/actions-model")

function validateActionID() {
    return (req, res, next) => {
        actions.get(req.params.id)
        .then((action) => {
            if(action) {
                req.action = action
                next()
            } else {
                res.status(404).json({ error: "That action does not exist"})
            }
        })
    }
}

function validateBeforeAddingAction() {
    return(req, res, next) => {
        const data = req.body
        if(!data) {
            res.status(400).json({error: "You must include changes"})
        } else if(!data.project_id || !data.description || !data.notes || !data.completed) {
            res.status(400).json({error: "Your request is missing information. Make sure you include a project_id, a description, notes, and choose wether the action is completed or not"})
        } else {
            req.newAction = data
            next()
        }
    }
}

function verifyRequestBody() {
    return(req, res, next) => {
        if(!req.body) {
            res.status(400).json({error: "you must include the information you would like to change. You can update the project_id, the description, the notes, and / or update wether or not the action is complete"})
        }
        else {
            req.changes = req.body
            next()
        }
    }
}

module.exports = {
    validateActionID,
    validateBeforeAddingAction,
    verifyRequestBody
}