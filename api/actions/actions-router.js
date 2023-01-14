// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const { checkActionId, checkNewAction, checkValidProject } = require('./actions-middlware')

const router = express.Router();

router.get('/', async (req,res, next) => {
    const data = await Actions.get()
    try {
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/:id',  checkActionId, (req, res, next) => {
    res.json(req.action)
})

router.post('/', [checkValidProject,checkNewAction],  async (req,res,next) => {
    const newPost = await Actions.insert(req.body)
    try {
        res.status(201).json(newPost)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', [checkActionId, checkNewAction], async (req, res, next) => {
    const success = await Actions.update(req.params.id, req.body)
    try {
        res.status(200).json(success)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(error => next(error))
})

router.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "error within the Actions router"
    })
})


module.exports = router;