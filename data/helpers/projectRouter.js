const router = require('express').Router()

const Project = require('./projectModel')
const Actions = require('./actionModel')

const currentTime = new Date().toDateString()

// @desc		Test end is working
// @route		GET /test
router.get('/test', (req, res) => {
    res.status(202).json({message: 'the server is running at ' + currentTime})
})
// @desc		Get all projects
// @route		GET /
router.get('/', (req, res) => {
    Project.get()
    .then(projects => res.status(200).json(projects))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
})
// @desc		Get all projects actions
// @route		GET /:id/actions
router.get('/:id/actions', (req, res) => {
    
    Project.getProjectActions(req.params.id)
    .then(actions=> res.status(200).json(actions))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
})
// @desc		Add a new project
// @route		POST /
router.post('/', (req, res) => {
    console.log(req.body)
    Project.insert(req.body)
    .then(project => res.status(202).json(project))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
})
// @desc		Update a project by id
// @route		PUT /:id
router.put('/:id', (req, res) => {
    console.log(req.params.id)
    Project.update(req.params.id, req.body)
    .then(project => res.status(202).json(project))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
})
// @desc		Remove a project by id
// @route		DELETE /:id
router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
    .then(()=>{res.status(200).json({message: "Shaniqua don't work here no moe"})})
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
})

module.exports = router