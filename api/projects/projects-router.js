const express = require('express');
const { validateProject, validateProjectId } = require('./projects-middleware')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')

const router = express.Router();

//[GET] api/projects
router.get('/', (req, res, next) => {
    Project.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

//[GET] api/projects/:id
 router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project)
})

//[POST] api/projects
router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

//[PUT] api/projects/:id
router.put('/:id', validateProject, validateProjectId,  (req, res, next) => {
    const { id } = req.params
    Project.update(id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
})

//[DELETE] api/projects/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Project.get(req.params.id)
        if (!deleted) {
            res.status(404).json({
                message: "The project does not exist"
            })
        } else {
            await Project.remove(req.params.id)
            res.json(deleted)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The post could not be removed',
            err:err
        })
    }

})

//[GET] api/projects/:id/actions
router.get('/:id/actions', validateProjectId, (req, res, next) => {
    const { id } = req.params
    Project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions[actions])
        })
        .catch(next)
})

// Catch-All Error Function
router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      message: "Something went wrong"
    })
  })



module.exports = router