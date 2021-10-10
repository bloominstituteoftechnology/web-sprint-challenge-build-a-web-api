// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const {validateActionsId} = require('./actions-middlware')
const actionRouter = express.Router()

actionRouter.get('/', async (req, res) => {
    try{
        const actions = await Actions.get()
        res.status(200).json(actions)
    }catch(err){
        res.status(500).json({message: 'There was an issue accessing the server'})
    }
})

actionRouter.get('/id:', validateActionsId, async (req, res, next) => {
    try{
        const id = req.params.id
        const actionFormId = await Actions.get(id)
        res.status(200).json(actionFormId)
    }catch(err){
        next(err)
    }
})

actionRouter.post('/', async (req, res) => {
    try{
        const {project_id, description, notes, completed} = req.body
        if(!project_id || !description || !notes || typeof completed === 'undefined'){
            res.status(400).json({message: 'We need all information'})
        }else{
            const newAction = await Actions.insert(req.body)
            res.status(201).json(newAction)
        }
    }catch(err){
        res.status(500).json({message: 'There was an issue accessing the server'})
    }
})

actionRouter.put('/:id', validateActionsId, async (req, res) => {
    try{
        const id = req.params.id
        const {project_id, description, notes, completed} = req.body
        if(!project_id || !description || !notes || typeof completed === 'undefined'){
            res.status(400).json({message: 'We need all information'})
        }else{
            const updatedAction = await Actions.update(id, req.body)
            res.status(201).json(updatedAction)
        }
    }catch(err){
        res.status(500).json({message: 'There was an issue accessing the server'})
    }
})

actionRouter.delete('/:id', validateActionsId, async (req, res, next) => {
    try{
        await Actions.remove(req.params.id)
        res.end()
    }catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message, customMessage: err.message})
})

module.exports = actionRouter