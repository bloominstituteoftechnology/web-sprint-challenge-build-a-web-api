const express = require('express');
const {
    validateProject,
    validateProjectId
} = require('./projects-middleware')
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
router.get('/:id', (req, res) => {

})

//[DELETE] api/projects/:id
router.delete('/:id', (req, res) => {

})

//[GET] api/projects/:id/actions
router.get('/:id/actions', (req, res) => {

})

// Catch-All Error Function
router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      message: "Something went wrong"
    })
  })



module.exports = router