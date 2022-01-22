const express = require('express');
const { validateUserId } = require('./actions-middlware.js');
const router = express.Router();
const Action = require('./actions-model.js');

router.get('/', (req, res) => { 
  Action.get(req.params.id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    }); 
});

router.get('/:id', validateUserId, (req, res) => {
  Action.get(req.params.id)
    .then(actionId => {
      res.status(200).json(actionId);
    })
    .catch(() => {
      res.status(404).json({ message: 'BEAT IT!' });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Action.update(id, changes)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});

router.post('/', (req, res) => {
  Action.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});

router.delete('/:id', (req, res) => {
  Action.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "It's over!" });
    })
    .catch(() => {
      res.status(404).json({ message: 'nope' });
    });
});

module.exports = router;