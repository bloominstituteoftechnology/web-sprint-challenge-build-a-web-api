// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const { validateActionsId, validateActions, } = require('../middleware/middleware')

const router = express.Router()

router.get('/', (req, res,) => {
    Actions.get()
           .then((actions) => {res.status(200).json(actions)})
           .catch((err) => {res.status(500).json({ message: 'Actions retrieval error: ', err})})
})

router.get('/:id', validateActionsId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/:id', validateActions, (req, res) => {
    Actions.insert(req.body)
           .then((action) => {res.status(201).json(action)})
           .catch((err) => {res.status(500).json({ message: 'modification error', err })})
})

router.delete('/:id', validateActionsId, (req, res) => {
    Actions.remove(req.params.id)
           .then((count) => {res.status(200).json({ message: 'successfully deleted!', count})})
           .catch((err) => {res.status(500).json({ message: 'deletion error', err})})
})

module.exports = router