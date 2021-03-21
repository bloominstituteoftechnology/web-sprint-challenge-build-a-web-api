const express= require('express');
const Projects = require('./projects-model.js');
const Actions = require('../actions/actions-model.js')
const router = express.Router();
const mw = require('../middleware/middleware.js')




router.get('/api/projects', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});

router.get('/api/projects/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const project = await Projects.get(id);
        if (!project) {
            res.status(404).json({ message: "The project with the specified id does not exist" });
        } else {
            res.status(200).json(project);
        }
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});
router.post('/api/projects', async (req, res) => {
    const body = req.body;

    if (!body.name || !body.description) {
        res.status(400).json({ message: "Please provide name and description" });
    } else {
        try {
            const newProject = await Projects.insert(body);
            res.status(201).json(newProject);
        } catch (err) {
            res.status(500).json({ Error: {err} });
        }
    }
});
router.delete('/api/projects/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedProject = await Projects.remove(id);
        if (!deletedProject) {
            res.status(404).json({ message: "The project with the given id does not exist" });
        } else {
            res.status(200).json(deletedProject);
        }
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});

router.put('/api/projects/:id', async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    if (!body.name && !body.description) {
        res.status(400).json({ message: "Please fill out the required fields" });
    } else {
        try {
            const updatedProject = await Projects.update(id, body);
            res.status(200).json(updatedProject);
        } catch (err) {
            res.status(500).json({ Error: {err} });
        }
    }
});



router.post('/api/projects/:id/actions', (req,res,next) =>{
    const actionInfo={...req.body, hub_id: req.params.id}

    Actions.add(actionInfo)
    .then(action =>{
        res.status(210).json(message)
    }).catch(err =>{
        next(err)
    })

})

router.get('/api/projects/:id/actions', async (req, res) => {
    const {id} = req.params;

    try {
        const projectActions = await Projects.getProjectActions(id);
        res.status(200).json(projectActions);
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});

router.use((err,req,res,next) => {
    res.status(500).json({
        message:"something blew up",
        error:err.message
})})
module.exports = router;
