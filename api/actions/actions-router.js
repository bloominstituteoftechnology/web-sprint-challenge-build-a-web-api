const express = require('express')
// these are actions
const Actions = require('./actions-model')

const middlewares = require('../.././middlewares/middlewares')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            console.log(error.message)
            res.status(500).json({ message: 'Error retrieving the actions' })
        });
});

router.get('/:id', middlewares.validateActionId, (req, res) => {
   res.status(200).json(req.action)
});

router.post('/', middlewares.validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error while saving the action to the database' })
        })
});

router.put('/:id', middlewares.validateAction, middlewares.validateActionId, (req, res) => {
    const changes = req.body;
    Actions.update(req.params.id, changes)
        .then(action => {
                res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The action information could not be modified' })
        })
});

router.delete('/:id', middlewares.validateActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(count => {
            count > 0
                res.status(200).json({ message: 'The action has been removed' })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The action could not be removed' })
        })
});

module.exports = router
