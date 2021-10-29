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

router.get('/:id', async(req, res, next) => {
    const { id } = req.params
    try {
        const project = await Projects.get(Number(id))
        if(!project) {
            res.status(404).json({
                message: "Project Not Found"
            })
        } else {
            res.status(200).json(project)
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router
