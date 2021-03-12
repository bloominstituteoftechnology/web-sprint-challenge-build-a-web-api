const express = require('express');

const Action = require('./actions-model');
const { validateActionsId, validateAction } = require('../middleware/middleware');

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

router.post('/', validateAction, (req, res) => {
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

module.exports = router;
