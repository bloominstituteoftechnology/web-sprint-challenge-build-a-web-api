const express = require('express');
const Project = require('./projects-model');
const router = express.Router();
const { 
    checkProjectId,
    validateProject,
    serverError 
} = require('../middleware/index');

// curl http://localhost:5000/api/projects
router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.get();
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
});

// curl http://localhost:5000/api/projects/:id
router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.project);
});

// curl -d '{"name": "project name", "description": "project description", "completed": "false"}' -H 'Content-Type: application/json' -X POST http://localhost:5000/api/projects
router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Project.insert(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

// curl -d '{"name": "changed project name", "description": "changed project description", "completed": "true"}' -H 'Content-Type: application/json' -X PUT http://localhost:5000/api/projects/:id
router.put('/:id', validateProject, checkProjectId, async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await Project.update(id, body);
        const updatedProject = await Project.get(id);
        res.status(201).json(updatedProject);
    } catch (err) {
        next(err);
    }
});

// curl -X DELETE http://localhost:5000/api/projects/:id
router.delete('/:id', checkProjectId, async (req, res, next) => {
    const id = req.params.id;
    try {
        await Project.remove(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

// curl http://localhost:5000/api/projects/:id/actions
router.get('/:id/actions', checkProjectId, async (req, res, next) => {
    const id = req.params.id;
    try {
        const projectActions = await Project.getProjectActions(id);
        res.status(200).json(projectActions);
    } catch (err) {
        next(err);
    }
});

router.use(serverError);

module.exports = router;