const express = require('express');

const {
    validateActionId,
    validateAction
 } = require('../actions/actions-middlware');
const Action = require('./actions-model');
const router = express.Router();


router.get('/', (req, res, next) => {
    Action.get()
      .then((actions) => {
        res.json(actions);
      })
      .catch(next);
  });

router.post('/:id', validateActionId, (req, res) => {
    res.json(req.actions);
});

router.post('/:id', validateAction, (req, res, next) => {
    Action.insert({ name: req.name, description: req.description })
        .then((actions) => {
            res.status(201).json(actions);
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