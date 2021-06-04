// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Projects = require('./projects-model')
const Actions = require('../actions/actions-model')

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get()
        res.json(projects)
    }
    catch(err) {
        res.status(500).json({
            message: 'failed to fetch projects'
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const project = await Projects.get(id)
        if (!project) {
            res.status(404).json({
                message: 'The specified project ID does not exist'
            })
        }else {
            res. status(200).json(project)
        }
    }
    catch(err) {
        res.status(500).json({
            error: {err}
        })
    }
})

router.post('/projects', async (req, res) => {
    const body = req.body
    if (!body.name || !body.description) {
        res.status(400).json('Name & description required')
    }else {
        try{
            const project = await Projects.insert(body)
            res.status(201).json(project)
        }
        catch(err) {
            res.status(500).json({
                error: {err}
            })
        }
    }
})



module.exports = router