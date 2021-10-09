// add middlewares here related to actions
const Actions = require("./actions-model")

function validateActionId(req,res, next){
    const {id}= req.params;

    Actions.get(id)
    .then((actions) => {
      if (!actions) {
        res.status(404).json([]);
      } else {
        req.actions = actions;
        next();
      }
    })
}

function validateRequestBody(req, res, next){
    const {notes, description, project_id} = req.body
    if(!notes || !description || !project_id || Object.keys(req.body).length === 0){
        res.status(400).json({message: "missing name, description or project ID field."})
      }else{
        next()
      }
}

module.exports = {
    validateActionId,
    validateRequestBody
}