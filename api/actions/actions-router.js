const express = require('express')
const Actions = require('./actions-model')
const { 
    handleError, 
    checkActionId, 
    checkCompleted 
} = require('./actions-middlware')
const { actionIdChecker } = require('../projects/projects-middleware')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkActionId, (req, res) => {
    res.status(200).json(req.actionById)
})

router.post('/', checkCompleted, actionIdChecker, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put("/:id", checkCompleted, checkActionId, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", checkActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.status(200).send("deleted actions")
    } catch (err) {
        next(err)
    }
})

router.use(handleError)

module.exports = router
