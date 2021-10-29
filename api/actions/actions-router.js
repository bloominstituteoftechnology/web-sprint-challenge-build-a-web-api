const express = require('express')
const Actions = require('./actions-model')
const { handleError, checkActionId } = require('./actions-middlware')
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

router.use(handleError)

module.exports = router
