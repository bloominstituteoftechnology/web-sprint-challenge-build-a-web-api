// Write your "projects" router here!
const express = require('express')
const { 
    validateProjectId,
    validateProject 
} = require('../middleware')

const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert({
        name: req.name,
        description: req.description,
        completed: req.completed
    })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
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
                res.status(404).json({actions})
            }
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'something tragic happened',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router