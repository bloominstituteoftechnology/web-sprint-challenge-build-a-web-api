// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const router = express.Router()

const { checkId, validateAction } = require('./actions-middlware');


router.get('/', async (req, res, next) => {
    try {
        const allActions = await Action.get()
        res.status(200).json(allActions)

    } catch (err) {
        next(err)
    }
})


router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.found)
})

router.post('/', validateAction, (req, res) => {

    Action.insert(req.body)
    res.status(200).json(req.body)
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})




module.exports = router;