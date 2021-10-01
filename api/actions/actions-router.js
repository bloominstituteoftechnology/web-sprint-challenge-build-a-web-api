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
router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction);
        })
        .catch(next)
})

//  [DELETE] /api/actions/:id
router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.action);
        })
        .catch(next);
})

module.exports = router;