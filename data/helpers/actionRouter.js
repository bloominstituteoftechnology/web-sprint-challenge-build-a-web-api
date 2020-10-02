const express = require('express');
const Action = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
    .then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(400).json({ message: 'Actions not found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving action',
        });
    });
});

router.get('/:id', (req, res) => {
    Action.get(req.params.id)
    .then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(400).json({ message: 'Action not found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving action',
        });
    });
});

router.post('/', (req, res) => {
    Action.insert(req.body)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error adding action'
        });
    });
});

router.delete('/:id', (req, res) => {
    Action.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'Action has been deleted' });
        } else {
            res.status(400).json({ message: 'Action could not be found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error removing action' 
        });
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Action.update(req.params.id, changes)
    .then(action => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(400).json({ message: 'Action could not be found'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error updating action' 
        });
    })
})

module.exports = router;