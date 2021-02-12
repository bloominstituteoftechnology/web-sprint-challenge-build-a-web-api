// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res) => {
    Actions.get(req.query)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            res.status(500).json({message: `Error retrieving actions: ${error}`})
        })
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({message: 'not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: `Error: ${error}`})
        })
})

router.post('/', (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            res.status(500).json({message: `Server error: ${error}`})
        })
})

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({message: 'not found'})
            }
        })
        .catch(error => {
            res.status(500).json(`error: ${error}`)
        })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(count => {
            res.status(200).json({message: 'Action deleted!'})
        })
        .catch(error => {
            res.status(500).json({message: `Server error: ${error}`})
        })
})

module.exports = router