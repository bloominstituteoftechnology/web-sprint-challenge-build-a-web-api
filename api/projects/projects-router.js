// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const { checkProjectId, checkNewProject} = require('./projects-middleware')

const router = express.Router();

router.get('/', async (req,res, next) => {
    const data = await Projects.get()
    try {
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/:id',  checkProjectId, (req, res, next) => {
    res.json(req.project)
})

router.post('/', [checkNewProject],  async (req,res,next) => {
    const newPost = await Projects.insert(req.body)
    try {
        res.status(201).json(newPost)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', checkProjectId,checkNewProject, async (req,res,next) => {
    const success = await Projects.update(req.params.id, req.body)
    try {
        res.status(200).json(success)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(error => next(error))
})

router.get('/:id/actions', checkProjectId, async(req,res,next) => {
    const actions = await Projects.getProjectActions(req.params.id)
    try {
        res.status(200).json(actions)
    } catch (error) {
        next(error)
    }
})

router.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "error within the Projects router"
    })
})
module.exports = router