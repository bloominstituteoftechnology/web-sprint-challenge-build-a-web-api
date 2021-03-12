const express = require('express')

const Action = require('./actions-model')
const { validateActionsId } = require('../middleware/middleware')

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

module.exports = router;