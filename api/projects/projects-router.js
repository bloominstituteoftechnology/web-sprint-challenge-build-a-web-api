// Write your "projects" router here!
const express = require('express')
const { 
    validateProjectId,
    validateProject 
} = require('../middleware')

const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert({
        name: req.name,
        description: req.description
    })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, {
        name: req.name,
        description: req.description
    })
        .then(() => {
            return Project.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

module.exports = router