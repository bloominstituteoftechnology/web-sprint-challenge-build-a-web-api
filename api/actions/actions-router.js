// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const Project = require('../projects/projects-model')
const {validateActionId, validateAction} = require('./actions-middlware')
const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/id:', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
    .then(() => {
        return Action.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try{
        await Action.remove(req.params.id)
        res.json(req.action)
    }catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message, customMessage: err.message})
})

module.exports = router