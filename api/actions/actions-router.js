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

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(res.Action)
    } catch (err) {
        next(err)
    }
})

 module.exports = router
 