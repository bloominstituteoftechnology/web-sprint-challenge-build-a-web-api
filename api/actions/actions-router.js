// Write your "actions" router here!

const express = require('express')
const router = express.Router()
const Action = require('./actions-model')

router.get('/', (req, res) => {
    Action.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Action.get(id)
        .then(action => {
            if(action){
                res.status(200).json(action)
            }
            else{
                res.status(404).json({ error: err.message })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ error: err.message })
        })
})

router.post('/', (req, res) => {
    const action  = req.body
    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({ errorMessage: 'missing required field'} )
    }
    Action.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'error adding the action'})
        })    
    })

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    
    Action.update(id, changes)
        .then(action => {
            if(req.body.project_id && req.body.description && req.body.notes && req.body.completed){
                res.status(200).json(action)
            }
            else{
                res.status(400).json({ errorMessage: 'missing required field'} )
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ error: err.message })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Action.remove(id)
        .then(action => {
            if(action){
                res.status(200).json({ message: "action deleted"})
            }
            else{
                res.status(404).json({ errorMessage: 'could not found an action with the id'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: 'action could not be deleted'})
        })
})




module.exports = router