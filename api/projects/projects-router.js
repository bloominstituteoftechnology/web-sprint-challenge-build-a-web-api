const express = require('express');

const { validateProjectId } = require('./projects-middleware');
const Projects = require('./projects-model');

const router = express.Router();

// [GET] /api/projects
router.get('/', (req, res, next) => {
    Projects.get()
        .then(projectArray => {
            
            res.status(200).json(projectArray);
        })
        .catch(next)
});

//  [GET] /api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.user);
});

//  [POST] /api/projects
// Returns the newly created project as the body of the response.
// If the request body is missing any of the required fields it responds with a status code 400.
router.post('/', (req, res) => {});

//  [PUT] /api/projects/:id
// Returns the updated project as the body of the response.
// If there is no project with the given id it responds with a status code 404.
// If the request body is missing any of the required fields it responds with a status code 400.
router.put('/:id', (req, res) => {})

//  [DELETE] /api/projects/:id
// Returns no response body.
// If there is no project with the given id it responds with a status code 404.
router.delete('/:id', (req, res) => {});

//  [GET] /api/projects/:id/actions
// Returns an array of actions (could be empty) belonging to a project with the given id.
// If there is no project with the given id it responds with a status code 404.
router.get('/:id/actions', (req, res) => {})

module.exports = router;
