const express = require('express');

const Actions = require('../actions/actions-model')
const Projects = require('./projects-model');
const mw = require('../middleware/middleware')

const router = express.Router()

//Get/Return all projects
router.get('/', (req, res) =>{
    Projects.get(req.query)
    .then((projects) =>{
        res.status(200).json(projects)
    })
    .catch((error) =>{
        res.status(500).json({message: 'Error retrieving projects'})
    })
})

//Get/Return project specified by id
router.get('/:id', mw.validateProjectId, (req, res) =>{
    res.status(200).json(req.project)
})

//POST/ Create a new Project
router.post('/', mw.validateProject, (req, res) =>{
    Projects.insert(req.body)
    .then((project) =>{
        res.status(201).json(project)
    })
    .catch((error) =>{
        res.status(500).json({message: 'Error adding project'})
    })
})

router.put('/:id', mw.validateProjectId, mw.validateProject, (req,res) =>{
    Projects.update(req.params.id, req.body)
    .then((project) =>{
        res.status(200).json(project)
    })
    .catch((error) =>{
        res.status(500).json({message: 'Error updating project'})
    })
})

router.delete('/:id', mw.validateProjectId, (req, res) =>{
    Projects.remove(req.params.id)
    .then((project) =>{
        res.status(200).json({message: 'Project has been deleted'})
    })
    .catch((error) =>{
        res.status(500).json({message: 'Error deleting project'})
    })
})

//GET Projects actions
router.get('/:id/actions', mw.validateProjectId, (req, res) =>{
    Actions.get(req.query)
    .then((actions) =>{
        res.status(200).json(actions)
    })
})

module.exports = router
