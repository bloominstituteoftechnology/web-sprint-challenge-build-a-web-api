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

//second request: Returns a project with the given id as the body of the response and if there is no project with the given id it responds with a status code 404.

router.get('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const projectFromId = await Projects.get(id);
        if(!projectFromId){
            res.status(404).json({
                message: "No project exists with this ID that has been given in the URL."
            })
        }
        else{
            res.status(200).json(projectFromId);
        }
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
