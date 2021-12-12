const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()
router.use(express.json())
const {validateActionId, validateAction} = require('./actions-middlware')

router.get('/', (req, res) => {
    Actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((err) => {
        res.status(500).json({message: err.message, customMessage: 'Actions get all error'})
    })
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then((action) => {
        if(!action){
            res.status(404).json({message: 'Action with the specified id does not exist'})
        }else{
            res.status(200).json(action)
        }
    })
    .catch((err) => {
        res.status(500).json({message: err.message})
    })
})

router.post('/', (req, res) => {
    if(!req.body.description || !req.body.notes || !req.body.project_id){
        res.status(400).json({message: 'Notes and description required'})
    }else{
        Actions.insert(req.body)
        .then((newAction) => {
            res.status(201).json(newAction)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
    }
})

router.put('/:id', validateActionId, validateAction, async (req, res) => {
    console.log(req.params.id)
    const updatedAction = await Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
    res.status(200).json(updatedAction)
})

router.delete('/:id', (req, res) => {
   Actions.remove(req.params.id)
   .then((deletedAction) => {
       if(!deletedAction){
           res.status(404).json({message: 'The action with this id does not exist'})
       }else{
           res.status(200).json()
       }
   })
   .catch((err) => {
       res.status(500).json({message: err.message})
   })
})

module.exports = router