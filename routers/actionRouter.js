const express = require('express');
const Action = require('../data/helpers/actionModel');

const router = express.Router();

//get all actions
router.get('/', (req, res) => {
    Action.get()
    .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({message: 'server error'})
      })

})

//get actions by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Action.get(id)
    .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({message: 'server error'})
      })

})

//create new action
router.post('/', (req, res) => {
    const newAction = req.body;

    Action.insert(newAction)
    .then(act => {
        res.status(201).json({new_action: newAction})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'server error'})
      })
})

//update an action
router.put('/:id', (req, res) => {
    const id = req.params.id;

    Action.update(id, req.body)
    .then(updates => {
        res.status(201).json({updates})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'server error'})
      })
})

//delete an action
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Action.remove(id, req.body)
    .then(updates => {
        res.status(201).json({updates})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'server error'})
      }) 
})


module.exports = router;