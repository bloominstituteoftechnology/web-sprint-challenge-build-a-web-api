// Write your "actions" router here!
const express = require("express")

const router = express.Router();

const Action = require("./actions-model.js");

router.get('/', (req, res) => {
    Action.get(req.query)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/:id', (req, res) => {
    Action.get(req.params.id)
    .then(actionId => {
        res.status(200).json(actionId)
    })
    .catch(() => {
        res.status(404).json({ message: "There is no action with this ID" })
    })
})

router.post('/', (req, res) => {
    Action.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(400).json({ message: error.message })
    })
})

router.delete('/:id', (req, res) => {
    Action.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: "action has been deleted!" })
    })
    .catch(() => {
        res.status(404).json({ message: "unable to delete action, ID for action does not exist" })
    })
})

module.exports = router