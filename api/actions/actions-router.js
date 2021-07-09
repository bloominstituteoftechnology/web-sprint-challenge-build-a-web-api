const express = require('express')
// pull in model
// pull in middleware
const Action = require('./actions-model')
const {
    validateActionId,
    validateAction
} = require('./actions-middlware')

// const { RuleTester } = require('eslint')

const router = express.Router()

router.get ('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get ('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post ('/', validateAction, (req, res, next) => {
    // console.log("POST endpoint connected")
    Action.insert(req.params.id, req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put ('/:id', validateActionId, (req, res) => {
    console.log("PUT endpoint connected")
})

router.delete ('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(req.action)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: err.message,
    })
})

module.exports = router