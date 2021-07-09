const express = require('express')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')
const { validateProjectId } = require('./projects-middleware')

const router = express.Router()

router.get ('/', (req, res) => {
    console.log("GET endpoint connected")
})

router.get ('/:id', validateProjectId, (req, res) => {
    console.log(req.project)
})

router.post ('/', (req, res) => {
    console.log("POST endpoint connected")
})

router.put ('/:id', validateProjectId, (req, res) => {
    console.log(req.project)
})

router.delete ('/:id', validateProjectId, (req, res) => {
    console.log(req.project)
})

router.get ('/:id/actions', validateProjectId, (req, res) => {
    console.log(req.project)
})

module.exports = router