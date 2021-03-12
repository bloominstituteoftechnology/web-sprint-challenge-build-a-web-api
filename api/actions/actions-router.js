const express = require('express');

const Action = require('./actions-model');
const {
  validateActionsId,
  validateActions,
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Could not retrieve Actions',
      });
    });
});

router.get('/:id', validateActionsId, (req, res) => {
  res.status(200).json(req.action);
});

router.post('/', validateActions, (req, res) => {
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not modifiy action',
      });
    });
});

router.put('/:id', validateActions, validateActionsId, (req, res) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not modifiy action',
      });
    });
});

router.delete('/:id', validateActionsId, (req, res) => {
  Action.remove(req.params.id)
    .then((count) => {
      res.status(200).json({
        message: 'The action has been deleted',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not delete action',
      });
    });
});

module.exports = router;
