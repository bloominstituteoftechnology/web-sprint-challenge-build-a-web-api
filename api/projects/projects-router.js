const express = require("express");
const Projects = require('./projects-model');


const router = express.Router();

//**get requests**//

//first request: Returns an array of projects as the body of the response and if there are no projects it responds with an empty array
router.get('/', async (req, res)=>{
    try{
        const projects = await Projects.get();
        res.status(200).json(projects);
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

//third request: Returns an array of actions (could be empty) belonging to a project with the given id.If there is no project with the given id it responds with a status code 404.
router.get('/:id/actions', async (req,res)=>{
    try{
        const id = req.params.id;
        const projectFromId = await Projects.get(id);
        const projectActions = await Projects.getProjectActions(id);
        if(!projectFromId){
            res.status(404).json({
                message: "No project exists with this ID that has been given in the URL. Hence, there are not any actions belonging to a project that does not exist"
            })
        }
        else{
            res.status(200).json(projectActions);
        }
    }
    catch(err){
        res.status(500).json({
            message: "There was an issue accessing the server with your information" 
        })
    }
})
//**get requests**//

//**post requests**//

//first request: Returns the newly created project as the body of the response and if the request body is missing any of the required fields it responds with a status code 400.
router.post('/', async (req,res)=>{
    try{
        const {name, description}=req.body;

        if(!name || !description){
            res.status(400).json({
                message: "We need both the name of the project and the description of the project before we can save it in our server."
            })
        }
        else{
            const newProject = await Projects.insert(req.body)
            res.status(201).json(newProject)
        }
    }
    catch(err){
        res.status(500).json({
            message: "There was an issue accessing the server with your information" 
        })
    }
})
//**post requests**//


//**put requests**//
//first request: Returns the updated project as the body of the response. If there is no project with the given id it responds with a status code 404. If the request body is missing any of the required fields it responds with a status code 400

router.put('/:id', async(req, res)=>{
    try{

    
        const projectFromId = await Projects.get(req.params.id);
        const {name, description, completed} = req.body;
        
       

        if(!name|| !description|| completed.notHere){
            res.status(400).json({message: " We need all information: name, description, and completed boolean value"})
        }else if(!projectFromId){
            res.status(404).json({message: "No project exists with this ID"})
        } else{
            const updatedProject = await Projects.update(req.params.id, req.body)
            res.status(200).json(updatedProject);
        }
    }
    catch(err){
        res.status(500).json({
            message: "There was an issue accessing the server with your information" 
        })
    }
})
//**put requests**//

//**delete requests**//
//first request: Returns no response body. If there is no project with the given id it responds with a status code 404.

router.delete('/:id', async (req,res)=>{
    try{
        const projectFromId = await Projects.get(req.params.id);
        if(!projectFromId){
            res.status(404).json({message: "No project exists with this ID"})
        }
        else{
            await Projects.remove(req.params.id)
        }
        
    }
    catch(err){
        res.status(500).json({
            message: "There was an issue accessing the server with your information" 
        }) 
    }
})
//**delete requests**//





// do not forget to export the router
module.exports=router;
