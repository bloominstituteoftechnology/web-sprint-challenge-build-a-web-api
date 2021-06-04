// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    }
    catch(err) {
        res.status(500).json({
            message: err
        })
    }
})

router.post('/actions', async (req, res) => {
    const body = req.body
    if (!body.project_id || !body.description || !body.notes) {
        res.status(400).json({
            message: 'Must fill all required fields.'
        })
    }else {
        try{
            const action = await Actions.insert(body)
            res.status(201).json(action)
        }
        catch(err) {
            res.status(500).json({
                message: err
            })
        }
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    if (!body.description && !body.notes) {
        res.status(400).json({
            message: 'Must fill all required fields.'
        })
    }else {
        try {
            const action = await Actions.update(id, body)
            if(!action) {
                res.status(404).json({
                    message: 'Specified ID does not exist'
                })
            }else {
                res.status(200).json(action)
            }
        }
        catch(err) {
            res.status(500).json({
                message: err
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const action = await Actions.remove(id)
        if(!action) {
            res.status(404).json({
                message: 'Specified ID does not exist'
            })
        }else {
            res.status(200).json(action)
        }
    }
    catch(err) {
        res.status(500).json({
            message: err
        })
    }
})

module.exports = router