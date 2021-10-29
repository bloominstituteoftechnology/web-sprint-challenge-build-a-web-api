const express = require('express')
const Projects = require('./projects-model')
const { actionIdChecker, validateAction, handleError } = require('./projects-middleware')
const router = express.Router()

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
        const project = await Projects.get(id)
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

router.post('/', validateAction, async (req, res, next) => {
    try{
        const newProject = await Projects.insert(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})

router.put("/:id", validateAction, actionIdChecker, async (req, res, next) => {
    if (req.body.completed === undefined) {
        next({ status: 400, message: "missing required fields"})
    } else {
        try {
            const updatedAction = await Projects.update(req.params.id, req.body)
            res.status(200).json(updatedAction)
        } catch (err) {
            next(err)
        }
    }
})

router.delete("/:id", actionIdChecker, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.status(200).send("Deleted Project")
    } catch (err) {
        next(err)
    }
})

router.use(handleError)

module.exports = router
