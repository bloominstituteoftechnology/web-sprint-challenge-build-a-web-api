// Write your "projects" router here!
const Project = require('./projects-model');
const express = require('express');

const router = express.Router()
const { checkId, validateProject } = require('./projects-middleware');
router.get('/', async (req, res, next) => {
    try {
        const allProjects = await Project.get()
        res.status(200).json(allProjects)

    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.body)
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Project.insert(req.body)
        console.log(req.body)
        console.log(newProject);
        res.status(201).json(newProject)

    } catch (error) {
        next(error)
    }
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

router.get('/:id/actions', (req, res) => {

})


module.exports = router;











