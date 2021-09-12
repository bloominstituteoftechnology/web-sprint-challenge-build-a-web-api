// Write your "actions" router here!
const express = require('express')
const {
   validateActionId,
   validateAction
} = require('./actions-middlware')
 
const Action = require('./actions-model')
 
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const users = await Action.get()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
 })

router.get('/:id', validateActionId, (req, res, next) => {
    try {
        res.json(req.action)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateAction, async (req, res, next) => {
    try {
        const newAction = await Action.insert({
            project_id: req.project_id,
            description: req.description,
            notes: req.notes,
            completed: req.completed
        })
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
        .then(() => {
            return Action.get(req.params.id)
        })
        .then(action => {
            res.json(action)
        })
        .catch(next)
 })
 
 

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(res.Action)
    } catch (err) {
        next(err)
    }
})

module.exports = router