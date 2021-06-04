const express = require('express');
const Projects = require('./projects-model');
const { logger, validateProjectId, validateProject } = require('./projects-middleware.js');

const router = express.Router();

// [GET] /api/projects
// returns array of projects as res.body
// responds with empty array if no projects
router.get('/', logger, (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next);
});

// [GET] /api/projects/:id
// returns project with given id as res.body
// responds with a 404 if no project with given id
router.get('/:id', logger, validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

// [POST] /api/projects
// returns newly created project as res.body
// responds with a 400 if req.body missing required fields
router.post('/', logger, validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next);
});

// [PUT] /api/projects/:id
// returns updated project as res.body
// responds with a 404 if no project with given id
// responds with a 400 if req.body missing required fields
router.put('/:id', logger, validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

// [DELETE] /api/projects/:id
// returns no res.body
// responds with a 404 if no project with given id
router.delete('/:id', logger, validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.status(200).json({
            message: "project deleted"
        })
    } catch (err) {
        next(err);
    }
});

// [GET] /api/projects/:id/actions
// returns array of actions for project with given id
// responds with a 404 if no project with given id
router.get('/:id/actions', logger, validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
});

module.exports = router;