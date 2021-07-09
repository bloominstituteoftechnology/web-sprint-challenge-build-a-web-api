// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message: "action not found"
            })
        } else {
            req.action = action
            next()
        }
    }
    catch(err) {
        next(err)
    }
}

function validateAction(req, res, next) {
    const { project_id, description, notes} = req.body
    if(!project_id || !description || !description.trim() || !notes || !notes.trim()) {
        res.status(400).json({
            message: "missing required fields of notes and description"
        })
    } else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
    }
}

module.exports = {
    validateActionId,
    validateAction
}