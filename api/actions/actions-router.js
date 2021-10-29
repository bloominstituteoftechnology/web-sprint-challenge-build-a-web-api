// Write your "actions" router here!
const express = require('express')
const { default: ReferenceSet } = require('yup/lib/util/ReferenceSet')

const {
    validateActionId,
} = require('./actions-middlware')

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

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})
module.exports = router;