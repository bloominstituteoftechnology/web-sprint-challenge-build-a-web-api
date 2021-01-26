// Write your "projects" router here!
const express = require("express");

const Projects = require("../projects/projects-model")

const router = express.Router();

router.get("/", (req,res) => {
    Projects.get()
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot get projects'})
    })
    })
    //  - [GET] /api/projects` sends an array of projects (or an empty array) as the body of the response.
    
    router.get('/:id', (req,res) => {
        const {id} = req.params;
        if(id){
        Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot get project id'})
        })
    }else{
        res.status(404).json({error:"ID not found"})
    }
    
    });
    
    //[GET] /api/projects/:id` sends a project with the given `id` as the body of the _response_.
    
    router.post('/', (req,res) => {
        const createProject = req.body;
    
        if(!createProject.name || !createProject.description) {
            res.status(400).json({error: "Needs a project name or description"})
            return;
        }else{
        Projects.insert(createProject)
        .then((project) => {
            res.status(201).json(createProject)
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot create project'})
            })
        }
    });
    
    
    //[POST] /api/projects` sends the newly created project as the body of the _response_.
    
    router.put('/:id`', (req,res) => {
        const {id} = req.params;
        const updateProjects = req.body;
        if(!id){
            res.status(404).json({error: "ID not found"})
            return;
        }else{
    
        Projects.update(id,updateProjects)
        .then((project)=> {
            res.status(200).json(updateProjects)
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot update project'})
        })
    }
    })
    
    //[PUT] /api/projects/:id` sends the updated project as the body of the _response_.
    
    
    router.delete('/:id', (req,res) => {
        const {id} = req.params;

        if(!id){
            res.status(404).json({error: "ID not found"})
            return;
        }else{
    
        Projects.remove(id)
        .then((project) => {
            res.status(200).json()
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot delete Project'})
            })
        }
    })
    
    //[DELETE] /api/projects/:id` sends no _response_ body.

    router.get("/:id/actions", (req,res) => {
        const {id} = req.params;
        if(!id){
            res.status(404).json({error: "ID not found"})
            return;
        }else{

        Projects.getProjectActions(id)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({error: 'System Error'})
        })
    }
    })

    module.exports = router;