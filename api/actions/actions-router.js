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
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Error retrieving the actions with id: ' + id })
    })
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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
  Projects.remove(req.params.id)
    .then(data => {
      res.status(200).json({ message: 'The project has been nuked' });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
});



module.exports = router;

