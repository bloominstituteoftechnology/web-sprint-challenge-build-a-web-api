// Write your "actions" router here!
const express = require('express')
const {
    validateActionId,
    validateAction
} = require('../middleware')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert({
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

module.exports = router