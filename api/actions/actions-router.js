const express = require("express");
const { validateActionsId } = require("./actions-middlware");
const Actions = require('./actions-model');

const actionRouter = express.Router();

//**get requests**//

//first request: Returns an array of actions (or an empty array) as the body of the response.
actionRouter.get('/', async (req, res)=>{
    try{
        const actions = await Actions.get();
        res.status(200).json(actions);
    }
    catch(err){
        res.status(500).json({
            message: "There was an issue accessing the server with your information"
        })
    }
})

//second request: Returns an action with the given id as the body of the response. If there is no action with the given id it responds with a status code 404.

actionRouter.get('/:id', validateActionsId, async (req, res, next)=>{
    try{
        const id = req.params.id;
        const actionFromId = await Actions.get(id);
        res.status(200).json(actionFromId);
    }
    catch(err){
        next(err)
    }
})
//**get requests**//


//**post requests**//

//first request: Returns the newly created action as the body of the response. If the request body is missing any of the required fields it responds with a status code 400. When adding an action make sure the project_id provided belongs to an existing project.

actionRouter.post('/', async (req,res,)=>{
    try{
        const {project_id, description, notes, completed}=req.body;
        if(!project_id || !description || !notes || typeof completed === "undefined"){
            res.status(400).json({message: " We need all information: name, description, and completed boolean value"})
        }
        else{
            const updatedAction = await Actions.insert(req.body)
            res.status(201).json(updatedAction)
        }
    }
    catch(err){
        res.status(500).json({
            message: "There was an issue accessing the server with your information"
        })
    }
})
//**post requests**//


module.exports = actionRouter;
