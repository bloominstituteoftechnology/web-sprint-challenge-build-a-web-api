// Write your "projects" router here!

const express = require('express');

const Projects = require('./projects-model');
const Actions = require('../actions/actions-model')

const router = express.Router();

// CRUD ENDPOINTS

router.get('/' , async (req, res) => {

    try {
        const projects = await Projects.get(req.id);
       res.status(200).json(projects)
    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.get('/:id' , async(req, res) => {
    try {
        const projects = await Projects.get(req.id);

        if(!projects) {
            res.status(404).json({message: "the user was not found"})
        } else {
            res.status(200).json({projects})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }

})

router.post('/' , async (req, res) => {
    try {
        const projects = await Projects.insert(req.action);
        if(!projects) {
            res.status(404).json({message: "was not able to create"})
        } else {
            res.status(201).json({projects});
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.put('/:id' , async (req, res) => {
    try {
        const projects = await  Projects.update(req.id, req.changes)
        if(!projects){
            res.status(404).json({message: "was not able to update"})
        } else {
            res.status(200).json({projects})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.delete('/:id' , async (req, res) => {
    try {
        const projects = await Projects.remove(req.id);
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
        const actions = await Actions.get(req.id);
        const projects = await Projects.get(req.id);
        if(!projects){
            res.status(404).json({message: "conditions not met"})
        } else if (actions === 3 && !projects) {
            res.status(500).json({message: "could not meet conditions"})
        } else {
            res.status(200).json({actions})
        }     

    } catch(err) {
        res.status(500).json({error: "there was an error with the request"})
    }
})


module.exports = router;
