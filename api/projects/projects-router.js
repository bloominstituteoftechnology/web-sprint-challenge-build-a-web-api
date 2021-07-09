const express = require('express')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')
const { validateProjectId, validateProject } = require('./projects-middleware')

const router = express.Router()

router.get ('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get ('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post ('/', validateProject, (req, res, next) => {
    // Project.insert({ name: req.name, description: req.description })
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put ('/:id', validateProjectId, (req, res) => {
    console.log(req.project)
    console.log("PUT endpoint connected")
})

router.delete ('/:id', validateProjectId, (req, res) => {
    console.log(req.project)
    console.log("DELETE endpoint connected")
})

router.get ('/:id/actions', validateProjectId, (req, res) => {
    console.log(req.project)
    console.log("GET with Actions endpoint connected")
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: err.message,
    })
})

module.exports = router