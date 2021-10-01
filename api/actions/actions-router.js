const express = require("express");
const { validateActionsId } = require("./actions-middlware");
const Actions = require('./actions-model');

const actionRouter = express.Router();

//**get requests**//

//first request: Returns an array of actions (or an empty array) as the body of the response.
actionRouter.get('/', async (req, res)=>{
    try{
        const projects = await Actions.get();
        res.status(200).json(projects);
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


module.exports = actionRouter;
