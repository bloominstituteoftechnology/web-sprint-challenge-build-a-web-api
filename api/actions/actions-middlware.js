// add middlewares here related to actions


// add middlewares here related to actions

// [ ] Write at least two middleware functions for this API
//, and consume them in the proper places of your code.


const Action = require("./actions/actions-model")

// project action

function validationAction( req, res, next){
    const{project_id, description, notes} = req.body;
    if(!project_id || !description || !notes ){

    next({ message: "missing creditials"})
}
}

function validateActionId(req, res, next){
    Action.get(req.params.id)
    .then(action => {
    if(!action){
        res.status(404).json({
            message:"no id exists"
          })
        }
    })
        .catch(next)
    }

module.exports = {
    validationAction,
    validateActionId
    
}
