const express = require('express');

const Action = require('./actions-model');
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', mw.logged, (req, res) => {
    Action.get()
        .then(act => {
            console.log(`here are the actions: ${act}`);
            res.status(200).json(act);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'actions could not be retrieved'
            });
        })
});

router.get('/:id', mw.logged, mw.validateActionId, (req, res) => {
    console.log('action was found');
    res.status(202).json(req.act);
});

router.post('/', mw.logged, mw.validateAction, (req, res) => {
    Action.insert(req.body)
        .then(act => {
            console.log(`here is your new action: ${act}`);
            res.status(201).json(act);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'action could not be created'
            });
        })
});

router.put('/:id', mw.logged, mw.validateActionId, mw.validateAction, (req, res) => {
    const { id } = req.params
    const updatedAction = req.body
    Action.update(id, updatedAction)
        .then(act => {
            if(act) {
                console.log(`here is your updated action: ${act}`);
                res.status(201).json(act);
            }else {
                console.log('action does not exist');
                res.status(404).json({
                    message: 'action does not exist'
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'your action could not be updated'
            });
        })
});

router.delete('/:id', mw.logged, mw.validateActionId, (req, res) => {
    const { id } = req.params
    Action.remove(id)
        .then(() => {
            console.log(`successfully deleted action: ${id}`);
            res.status(200).json({
                message: `successfully deleted action: ${id}`
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'action could not be deleted'
            });
        })
});

module.exports = router;
