const express = require('express')

const Actions = require('./actions-model')
const mw = require('../middleware/middleware')

const router = express.Router()

router.get('/', (req, res) =>{
    Actions.get(req.query)
    .then((actions) =>{
        res.status(200).json(actions)
    })
    .catch(() =>{
        res.status(500).json({message: 'Error retrieving actionss'})
    })
})

router.get('/:id', mw.validateActionId, (req, res) =>{
    res.status(200).json(req.action)
})

router.post('/', mw.validateAction, (req, res) =>{
    console.log(req.body)
    Actions.insert(req.body)
    .then((action) =>{
        console.log('action', action)
        res.status(201).json(action)
    })
    .catch((error) =>{
        res.status(500).json({message: 'Error adding action'})
    })
})

router.put('/:id', mw.validateActionId, (req, res) =>{
    Actions.update(req.params.id, req.body)
    .then((action) =>{
        res.status(200).json(action)
    })
    .catch(() =>{
    res.status(500).json({message: `Error updating action`});
    })
})

module.exports = router;
