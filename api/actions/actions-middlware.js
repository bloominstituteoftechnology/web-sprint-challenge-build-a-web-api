const Action = require('./actions-model')

// middleware to get project id from projects database
async function validateActionId (req, res, next) {
    console.log("Action middleware connected")
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({message: "action not found"})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        next(err)
    }
}

// middleware to validate required notes and description fields for actions
function validateAction (req, res, next) {
    const { description, notes, project_id } = req.body
    if (!notes || !notes.trim() || !description || !description.trim() || !project_id) {
        res.status(400).json({
            message: "missing required field (notes or description)"
        })
    } else {
        req.notes = notes.trim()
        req.description = description.trim()
        req.project_id = project_id
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction
}