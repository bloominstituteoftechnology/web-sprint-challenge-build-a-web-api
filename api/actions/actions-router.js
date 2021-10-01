const express = require("express");
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
//**get requests**//


module.exports = actionRouter;
