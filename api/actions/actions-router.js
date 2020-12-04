const express = require('express');

const Actions = require('./actions-model')


const router = express.Router();

router.get('/', (req, res) => {
  Actions.get(req.query.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Error retrieving the actions' })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  Actions.get(id)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: 'This id does not exist'
        })
      } else {
        res.status(200).json(data)
      }
    })
    .catch(error => {
      console.log(error)
      res.status(404).json({ message: 'Error retrieving the actions with id: ' + id })
    })
});

router.post('/', [validateAction], (req, res) => {
  Actions.insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the action',
      });
    });
});

router.put('/:id', [validateAction], (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating the action',
      });
    });
});

router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then(data => {
      res.status(200).json({ message: 'The action has been nuked' });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the actions',
      });
    });
});

// ----- Custom Middleware -----


function validateAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message: 'Include project_id, description, and notes in your request'
    })
  } else {
    next();
  }
}

module.exports = router;

