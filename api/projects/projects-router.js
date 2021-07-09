const express = require('express')
const Project = require('./projects-model')
const {
    validateProjectId,
    validateProject
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

// router.post('/', (req, res, next) => {
//     res.json({
//         message: req.body
//     })
// })

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
 

module.exports = router