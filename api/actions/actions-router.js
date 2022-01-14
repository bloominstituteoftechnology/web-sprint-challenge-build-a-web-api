const express = require('express');
const {
  theActions,
  validateActionId,
  validateAction,
  updateAction,
  deleteActions
} = require('./actions-model');
const Action = require('./actions-model');
const router = express.Router();

router.get('/api/actions', theActions, (req, res) => {
  res.json(req.project)
});

router.get('/api/action/:id', validateActionId, (req, res, next) => {
  Action.get()
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
});

router.post('/api/actions', validateAction, (req, res, next) => {
  Action.insert({ project_id: req.project_id, description: req.description, notes: req.notes })
  .then()
  .catch(next)
});

router.put('/:api/actions/:id', updateAction, (req, res, next) => {
  Action.update(req.params.id, { project_id: req.project_id, description: req.description, notes: req.notes })
  .then(() => {
    return Action.update(req.params.id)
  })
  .then(actions => {
    res.json(actions)
  })
  .catch(next)
});

router.delete('/api/actions/:id', deleteActions, async (req, res, next) => {
  try {
    await Action.remove(req.params.id)
    res.json(res.action)
  } catch (err) {
    next(err)
  }
});

module.exports = router;