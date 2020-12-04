// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const actions = require('./actions-model');

router.get(':/id', (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(500).json({ message: 'ID is required!' })
    } else {
        actions
            .get(id)
            .then((success) => {
                res.status(200).json({ success });
            })
            .catch((err) => {
                res.status(404).json({ message: 'Oops, there was an error.'})
            });
    }
});

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      res
        .status(500)
        .json({ message: 'Make sure to provide project ID, description & notes.'});
    } else if (description.length > 127) {
      res
        .status(500)
        .json({ message: 'Description has to be less than 128 characters.' });
    } else {
      actions
        .insert(req.body)
        .then((success) => {
          res.status(201).json({ success });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(404)
            .json({ message: 'Request not completed.' });
        });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!id) {
      res.status(500).json({ message: 'ID required!' });
    } else {
      actions
        .update(id, changes)
        .then((success) => {
          res.status(200).json({ success });
        })
        .catch((err) => {
          res.status(404).json({ message: ' Oops, there was an error.' });
        });
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.status(500).json({ message: 'ID required!' });
    } else {
      actions
        .remove(id)
        .then((success) => {
          res.status(200).json({ success });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(404)
            .json({ message: 'Couldnt delete at the moment' });
        });
    }
  });
  
  module.exports = router;