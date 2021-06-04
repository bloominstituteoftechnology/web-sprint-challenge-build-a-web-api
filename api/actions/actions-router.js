const express = require('express');
const Actions = require('./actions-model');
const { logger, validateActionId, validateAction } = require('./actions-middleware');

const router = express.Router();

// [GET] /api/actions
// returns array of actions as res.body
router.get('/', logger, (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
})

// [GET] /api/actions/:id
// returns action with given id as res.body
// responds with a 404 if no action with given id
router.get('/:id', logger, validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

// [POST] /api/actions
// returns newly created action as res.body
// responds with a 400 if req.body missing required fields
// confirms project_id belongs to existing project
router.post('/', logger, validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next);
});

// [PUT] /api/actions/:id
// returns updated action as res.body
// responds with a 404 if no action with given id
// responds with a 400 if req.body missing required fields
router.put('/:id', logger, validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

// [DELETE] /api/actions/:id
// returns no res.body
// responds with a 404 if no action with given id
router.delete('/:id', logger, validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id);
        res.status(200).json({
            message: "action deleted"
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;