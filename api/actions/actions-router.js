// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const {
    validateActionId,
    validateAction
} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

module.exports = router