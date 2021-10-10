// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId (req, res, next){
    console.log('Action middleware connected')
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(200).json({message: 'action not found'})
        }else{
            req.action = action
            next()
        }
    }catch(err){
        next(err)
    }
}

function validateAction (req, res, next){
    const {description, notes, project_id} = req.body
    if(!project_id || !notes || !notes.trim() || !description || !description.trim()){
        res.status(400).json({message: 'missing required field'})
    }else{
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