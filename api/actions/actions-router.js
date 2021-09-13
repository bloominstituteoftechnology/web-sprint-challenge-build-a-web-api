const express = require('express');
const Action = require('./actions-model');
const router = express.Router();

const {
    validateActionId,
    validateAction
 } = require('../actions/actions-middlware');

router.get('/', (req, res, next) => {
    Action.get()
      .then((actions) => {
        res.json(actions);
      })
      .catch(next);
  });

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.actions);
});

router.post('/', validateAction, (req, res, next) => {
    Action.insert({ name: req.name, description: req.description })
        .then((newActions) => {
            res.status(201).json(newActions);
        })
        .catch(next);
});

router.put('/:id',validateAction, validateActionId, (req, res, next) => {
    Action.update(req.params.id, { name: req.name, description: req.description })
        .then(() => {
            return Action.update(req.params.id);
        })
        .then((actions) => {
            res.json(actions);
        })
        .catch(next);
});

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id);
        res.json(req.actions);
    } catch (err) {
        next(err);
    }
});

module.exports = router;