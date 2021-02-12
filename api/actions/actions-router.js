const express = require('express')

const Actions = require('./actions-model')
const mw = require('../middleware/middleware')

const router = express.Router()

router.get('/', (req, res) =>{
    Actions.get(req.params.id)
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
    Actions.insert(req.body)
    .then((action) =>{
        res.status(201).json(action)
    })
    .catch(() =>{
        res.status(500).json({message: 'Error adding action'})
    })
})

router.put('/:id', mw.validateActionId, mw.validateAction, (req, res) =>{
    Actions.update(req.params.id, req.body)
    .then((action) =>{
        res.status(200).json(action)
    })
    .catch(() =>{
    res.status(500).json({message: `Error updating action`});
    })
})

router.delete('/:id', mw.validateActionId, (req, res) =>{
    Actions.remove(req.params.id)
    .then(() =>{
        res.status(200).json({message: 'Action has been deleted'})
    })
    .catch(() =>{
        res.status(500).json({message:'Error Deleting action'})
    })
})
module.exports = router;
