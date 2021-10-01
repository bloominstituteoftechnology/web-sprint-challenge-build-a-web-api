const express = require("express");
const Projects = require('./projects-model');
const Actions = require('../actions/actions-model');

const router = express.Router();

//get requests//

//first request: Returns an array of projects as the body of the response and if there are no projects it responds with an empty array
router.get('/', async (req, res)=>{
    try{
        const projects = await Projects.get();
        res.status(400).json(projects);
    }
    catch(err){
        res.status(500).json({
            message: "There was an issue accessing the server with your information"
        })
    }
})
//get requests//






// do not forget to export the router
module.exports=router;
