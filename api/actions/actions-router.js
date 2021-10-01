// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const router = express.Router()



router.get('/', async (req, res, next) => {
    try {
        const allActions = await Action.get()
        res.status(200).json(allActions)

    } catch (err) {
        next(err)
    }
})


router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})




module.exports = router;