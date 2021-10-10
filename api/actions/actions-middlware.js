// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionsId (req, res, next){
    try{
        const action = await Actions.get(req.params.id)
        if(!action){
            res.status(404).json({message: 'No action found with that ID'})
        }else{
            req.actions = action
            next()
        }
    }catch(err){
        res.status(500).json({message: 'Having trouble accessing the database'})
    }
}

module.exports = {validateActionsId}