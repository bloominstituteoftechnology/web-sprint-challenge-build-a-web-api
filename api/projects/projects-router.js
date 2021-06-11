// Write your "projects" router here!
const express = require('express');
const projects = require('./projects-model.js');

//middleware
const { validateProjectId, validateProject } = require('../middleware.js');

const router = express.Router();


// - [x] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.
router.get('/api/projects', (req, res) => {
    projects.get(req.query)
        .then(projectArray => {
            res.status(200).json(projectArray)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error recieving projects data'});
        });
})

// - [x] `[GET] /api/projects/:id`
//   - Returns a project with the given `id` as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
router.get('/api/projects/:id', validateProjectId, (req, res) => {
    projects.get(id)
        .then(projId => {
            res.status(200).json(projId)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error finding specific project id'});
        });
});

// - [x] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.post('/api/projects', validateProject, (req, res) => {
    projects.insert(project)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Could not update project details'})
        })
});

// - [x] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put('/api/projects/:id', validateProjectId, validateProject, (req, res) => {
    projects.update(id, changes)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Could not update project id'})
        })
});

// - [x] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.
router.delete('/api/projects/:id', validateProjectId, (req, res) => {
    projects.remove(id)
        .then(() => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: 'Error removed this project'});
        });
});

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.

router.get('/api/projects/:id/actions', validateProjectId, (req, res) => {
    projects.getProjectActions(projectId)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Could not retrieve projects actions'})
        });
});




module.exports = router;
