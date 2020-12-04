// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const Project = require('./projects-model')
    

router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Project.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ error: err.message })
        })
})


router.post('/', (req, res) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({ errorMessage: 'missing required field'})
    }
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    if(!req.body.name || !req.body.description){
        res.status(400).json({ errorMessage: 'missing required field'})
    }

    Project.update(id, changes)
        .then(project => {
            res.status(200).json(changes)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ error: err.message })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Project.remove(id)
    .then(project => {
        res.status(200).json({ message: "project deleted"})
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({ message: 'project could not be deleted'})
    })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Project.getProjectActions(id)
        .then(projectId => {
            if(projectId){
                res.status(200).json(projectId)
            }
            else{
                res.status(404).json({ errorMessage: 'could not find the action' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })
})

module.exports = router