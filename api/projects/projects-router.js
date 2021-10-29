const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()
const { actionIdChecker, validateAction } = require('./projects-middleware')

router.get('/', async(req, res, next) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
