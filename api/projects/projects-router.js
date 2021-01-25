// Write your "projects" router here!

const express = require('express');

const Projects = require('./projects-model');
const Actions = require('../actions/actions-model')

const router = express.Router();

// CRUD ENDPOINTS

router.get('/' , async (req, res) => {

    try {
        const projects = await Projects.get(req.params.id);
       res.status(200).json(projects)
    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.get('/:id' , async(req, res) => {
    try {
        const projects = await Projects.get(req.params.id);

        if(projects.length > 0) {
            res.status(200).json({projects})
        } else {
            res.status(404).json({message: "the user was not found"})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }

})

router.post('/' , async (req, res) => {
    try {
        const projects = await Projects.insert(req.body);
        if(projects) {
            res.status(201).json({projects});
        } else {
            res.status(404).json({message: "was not able to create"})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.put('/:id' , async (req, res) => {
    const changes = req.body
    try {
        const projects = await  Projects.update(req.params.id, changes)
        if(projects){
            res.status(200).json({projects})
        } else {
            res.status(404).json({message: "was not able to update"})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.delete('/:id' , async (req, res) => {
    try {
        const projects = await Projects.remove(req.params.id);
        if(projects > 0) {
            res.status(200).json({message: "removed"})
        } else {
            res.status(404).json({message: "not found"})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

// [GET] /api/projects/:id/actions 

router.get("/:id/actions", async (req, res) => {
    try{
        const actions = await Actions.getProjectActions(req.params.id, projects);
        if(projects){
            res.status(404).json({message: "conditions not met"})
        } else if (actions === 3) {
            res.status(500).json({message: "could not meet conditions"})
        } else {
            res.status(200).json({actions})
        }     

    } catch(err) {
        res.status(500).json({error: "there was an error with the request"})
    }
})


module.exports = router;
