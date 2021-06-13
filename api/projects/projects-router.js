// Write your "projects" router here!
const express = require("express")

const router = express.Router();

const Project = require("./projects-model.js");

router.get('/', (req, res) => {
    Project.get(req.query)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.get('/:id', (req, res) =>{
    const { id } = req.params
    Project.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(404).json({ message: error.message })
    })
})

router.get('/:id/actions', (req, res) =>{
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(404).json({ message: error.message })
    })
})

router.post('/', (req, res) => {
    Project.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    Project.update(req.params.id, changes)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: "Delete complete" })
    })
    .catch(error => {
        res.status(404).json({ message: error.message })
    })
})

module.exports = router;