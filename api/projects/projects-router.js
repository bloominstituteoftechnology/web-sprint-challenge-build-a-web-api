const express = require('express');

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

router.post('/', mw.validateProject, (req, res) =>{
    Projects.insert(req.body)
    .then((project) =>{
        res.status(201).json(project)
    })
    .catch((error) =>{
        res.status(500).json({message: 'Error adding project'})
    })
})

router.put('/:id', mw.validateProjectId , (req,res) =>{
    Projects.update(req.params.id, req.body)
    .then((project) =>{
        res.status(200).json(project)
    })
    .catch((error) =>{
        res.status(500).json({message: 'Error updating project'})
    })
})

module.exports = router
