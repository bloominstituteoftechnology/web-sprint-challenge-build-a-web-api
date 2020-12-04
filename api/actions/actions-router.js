const express = require('express')
const Action = require('./actions-model')

const router = express.Router();

router.get('/api/actions', (req, res) => {
    const { query } = req
    Action.get(query)
        .then(actions => {
            res.json(actions)
        })
        .catch(error => {
            console.log(error.message)
            res.json(error.message)
        });
});

router.get('/api/actions', async (req, res) => {
    const { query } = req
    try {
        const actions = await Action.get(query)
        res.json(actions)
    } catch (error) {
        res.json(error.message)
    }
});

router.get('/api/actions/:id', (req, res) => {
    Action.get(req.params.id)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: 'The action with the specified id does not exist' })
                }
            })
        .catch(error => {
            res.status(500).json({ errorMessage: 'The action information cound not be retrieved', error })
        })
});

router.post('/api/actions', (req, res) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes || !req.body.completed) {
        res.status(400).json({ message: 'Please provide project id, description, notes and mark completed' })
    }
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error while saving the action to the database' })
        })
});

router.put('/api/actions/:id', (req, res) => {
    const changes = req.body;
    Action.update(req.params.id, changes)
        .then(action => {
            if (action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: 'The action with the specified id does not exist' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The action information could not be modified' })
        })
});

router.delete('/api/actions/:id', (req, res) => {
    Action.remove(req.params.id)
        .then(count => {
            if (count > 0 ) {
                res.status(200).json({ message: 'The action has been removed' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The action could not be removed' })
        })
});

module.exports = router
