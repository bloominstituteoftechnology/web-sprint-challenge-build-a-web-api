const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

// [GET] /api/projects
// Returns an array of projects as the body of the response.
// If there are no projects it responds with an empty array.
router.get('/', (req, res) =>{});


//  [GET] /api/projects/:id
// Returns a project with the given id as the body of the response.
// If there is no project with the given id it responds with a status code 404.
router.get('/:id', (req, res) => {});

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
