// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
        
})

module.exports = router;