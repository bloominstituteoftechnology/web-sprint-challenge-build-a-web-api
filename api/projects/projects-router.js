// Write your "projects" router here!
const Project = require('./projects-model');
const express = require('express');

const router = express.Router()
const { checkId, validateProject, validateChange } = require('./projects-middleware');
router.get('/', async (req, res, next) => {
    try {
        const allProjects = await Project.get()
        res.status(200).json(allProjects)

    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.found)
})

router.post('/', validateProject, async (req, res) => {

    const newProject = await Project.insert(req.body)
    console.log(req.body)
    res.status(201).json(newProject)


})

router.put('/:id', checkId, validateChange, async (req, res) => {
    const updated = await Project.update(req.params.id, req.body)

    res.status(200).json(updated)
})

router.delete('/:id', checkId, async (req, res) => {
    console.log(req.found)
    await Project.remove(req.params.id)
    res.status(200).json([{ number_of_deleted: "project blow has been deleted", deleted_project: req.found }])
})

router.get('/:id/actions', checkId, (req, res) => {

})


module.exports = router;











