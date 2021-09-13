// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const {
    validateProjectId,
    validateProject,
} = require('./projects-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const users = await Project.get()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, (req, res, next) => {
    try {
        res.json(req.project)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Project.insert({
            name: req.name,
            description: req.description,
            completed: req.completed
        })
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})


router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, {
        name: req.name,
        description: req.description,
        completed: req.completed
    })
        .then(() => {
            return Project.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
 })


router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(res.Project)
    } catch (err) {
        next(err)
    }
 })

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            if (actions.length > 0) {
                res.status(200).json(actions)
            } else {
                res.status(404).json((actions))
            }
        })
        .catch(next)
})
module.exports = router;