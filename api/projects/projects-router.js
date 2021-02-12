// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.get(req.query)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({message: `Error: ${error}`})
        })
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({message: 'not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: `Server error: ${error}`})
        })
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({message: `Server error: ${error}`})
        })
})

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({message: 'not found'})
            }
        })
        .catch(error => {
            res.status(500).json(`Server error: ${error}`)
        })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            res.status(200).json({message: 'project deleted!'})
        })
        .catch(error => {
            res.status(500).json({message: `Server error: ${error}`})
        })
})

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({message: 'project not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: `Error: ${error}`})
        })
})

module.exports = router