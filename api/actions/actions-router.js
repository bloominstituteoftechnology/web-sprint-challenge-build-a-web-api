const express = require('express');
const actions = require('./actions-model.js');

//middleware
const { validateActionId, validateAction } = require('../middleware.js');

const router = express.Router();

// - [x] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get('/api/actions', (req, res) => {
    actions.get(req.query)
        .then(actionsArray => {
            res.status(200).json(actionsArray)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error recieving actions data'});
        });
})

// - [x] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
router.get('/api/actions/:id', validateActionId, (req, res) => {
    actions.get(id)
        .then(actionsId => {
            res.status(200).json(actionsId)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error finding specific action id'});
        });
});

// - [x] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
router.post('/api/actions', validateAction, (req, res) => {
    actions.insert(action)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Could not update action details'})
        })
});

// - [x] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put('/api/actions/:id', validateActionId, validateAction, (req, res) => {
    actions.update(id, changes)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Could not update action id'})
        })
});

// - [x] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.
router.delete('/api/actions/:id', validateActionId, (req, res) => {
    actions.remove(id)
        .then(() => {
            res.status(200).json(actions)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: 'Error removed this action'});
        });
});



module.exports = router;
