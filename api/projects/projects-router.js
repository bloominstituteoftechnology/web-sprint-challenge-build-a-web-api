const express = require('express')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')
const { 
    validateProjectId, 
    validateProject, 
    validateProjectWithCompleted 
} = require('./projects-middleware')

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

router.put ('/:id', validateProjectId, validateProject, (req, res, next) => {
    // console.log(req.project)
    // console.log("PUT endpoint connected")
    Project.update(req.params.id, req.body)
        .then(() => {
            return Project.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.delete ('/:id', validateProjectId, async (req, res, next) => {
    // console.log(req.project)
    // console.log("DELETE endpoint connected")
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }

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