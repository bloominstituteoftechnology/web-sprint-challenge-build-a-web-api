const express = require('express');
const Project = require('../data/helpers/projectModel');

const router = express.Router();

//get all projects
router.get('/', (req, res) => {
    Project.get()
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        res.status(500).json({message: "server error"})
    })
})

//get project by id
router.get('/:id', (req, res) => {
    const id = req.params.id

    Project.get(id)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        res.status(500).json({message: "server error"})
    })
})

//get project actions by id
router.get('/:id/linked-actions', (req, res) => {
    const id = req.params.id

    Project.getProjectActions(id)
    .then(actions => {
        res.status(201).json(actions)
    })
    .catch(error => {
        res.status(500).json({message: "server error"})
    })
})

//post a project
router.post('/', (req, res) => {
    const newProject = req.body;

    Project.insert(newProject)
    .then(project => {
        res.status(201).json({project_created: newProject})
    })
    .catch(error => {
        res.status(500).json({message: "server error"})
    })
})

//edit a project
router.put('/:id', (req, res) => {
    const id = req.params.id

    Project.update(id, req.body)
    .then(changes => {
        res.status(201).json(changes)
    })
    .catch(error => {
        res.status(500).json({message: "server error"})
    })
})

//delete a project
router.delete('/:id', (req, res) => {
    const id = req.params.id

    Project.remove(id)
    .then(project => {
        res.status(201).json({deleted_project: project})
    })
    .catch(error => {
        res.status(500).json({message: "server error"})
    })
})



module.exports = router;