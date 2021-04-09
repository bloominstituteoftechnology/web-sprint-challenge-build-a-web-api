const actions = require("./actions-model.js")

function validateActionID(req, res, next){
    actions.get(req.params.id)
    .then(action=>{
        if (!action || Object.keys(action).length === 0){
            return res.status(404).json("Action with specified ID not found.");
        }
        req.action = action;
        next();
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
}

function validateActionBody(req, res, next){
    if (!req.body.project_id || !req.body.notes || !req.body.description) {
        return res.status(400).json("Required fields missing");
    }
    next();
}

module.exports = {validateActionID, validateActionBody}