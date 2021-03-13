// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const { validateProjectsId, validateProjects } = require('../middleware/middleware')
const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
            .then((projects) => {res.status(200).json(projects)})
            .catch((err) => {res.status(500).json({ message: 'projects retrieval error: ', err })})
})

router.get('/:id', validateProjectsId, (req, res) => {res.status(200).json(req.project)})

router.post('/', validateProjects, (req, res) => {
    Projects.insert(req.body)
            .then((project) => {res.status(201).json(project)})
            .catch((err) => {res.status(500).json({ message: 'insertion error: ', err })})
})

router.put('/:id', validateProjects, validateProjectsId, (req, res) => {
    Projects.update(req.params.id, req.body)
            .then((project) => {res.status(201).json(project)})
            .catch((err) => {res.status(500).json({ message: 'update error: ', err })})
})

router.delete('/:id', validateProjectsId, (req, res) => {
    Projects.remove(req.params.id)
            .then((count) => {res.status(200).json({ message: 'successful deletion', count })})
            .catch((err) => {res.status(500).json({ message: 'deletion error: ' , err })})
})

router.get('/:id/actions', validateProjectsId, (req, res) => {
    Projects.getProjectActions(req.params.id)
            .then((actions) => {res.status(200).json(actions)})
            .catch((err) => {res.status(500).json({ message: 'actions retrieval error: ', err})})
})

module.exports = router