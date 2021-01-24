// Write your "projects" router here!
const express = require("express");

const Projects = require("../projects/projects-model")

const router = express.Router();

router.get("/api/projects", (req,res) => {
    Projects.get(req.body)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot get projects'})
    })
    })
    //  - [GET] /api/projects` sends an array of projects (or an empty array) as the body of the response.
    
    router.get('/api/projects/:id', (req,res) => {
        Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot get project id'})
        })
    
    });
    
    //[GET] /api/projects/:id` sends a project with the given `id` as the body of the _response_.
    
    router.post('/api/projects', (req,res) => {
        Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot create project'})
        })
    });
    
    
    //[POST] /api/projects` sends the newly created project as the body of the _response_.
    
    router.put('/api/projects/:id`', (req,res) => {
        const projectID = req.params.id;
        const updateProjects = req.body;
    
        Projects.update(projectID,updateProjects)
        .then(()=> {
            res.status(200).json({message: 'Post has been updated!'})
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot update project'})
        })
    })
    
    //[PUT] /api/projects/:id` sends the updated project as the body of the _response_.
    
    
    router.delete('/api/project/:id', (req,res) => {
        const project = req.project;
    
        Projects.remove(project.id)
        .then(() => {
            res.status(200).json({message: "Project has been deleted"})
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot delete Project'})
        })
    })
    
    //[DELETE] /api/projects/:id` sends no _response_ body.

    router.get("/api/projects/:id/actions", (req,res) => {
        Projects.getProjectActions(req.body)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({error: 'Cannot delete Project'})
        })
    })