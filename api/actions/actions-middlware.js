const Action = require('./actions-model')

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
     validateAction,
     validateActionId
 }