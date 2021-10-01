const express = require('express');
const { validateActionId, validateAction } = require('./actions-middlware');
const Actions = require('./actions-model');

const router = express.Router();

// [GET] /api/actions
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
});

//  [GET] /api/actions/:id
router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

//  [POST] /api/actions
router.post('/', validateAction,(req, res, next) => {
    Actions.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next);
});

//  [PUT] /api/actions/:id
// Returns the updated action as the body of the response.
// If there is no action with the given id it responds with a status code 404.
// If the request body is missing any of the required fields it responds with a status code 400.
router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(resp => {
            console.log("tacos!", resp)
        })
        .catch(next)
})

//  [DELETE] /api/actions/:id
// Returns no response body.
// If there is no action with the given id it responds with a status code 404.
router.delete('/:id', (req, res) => {})

module.exports = router;