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
            res.status(500).json({ error: err.message })
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
module.exports = router