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
      res.status(500).json({ message: 'Error: I unable to copmlete that action.' })
    })
});



router.get('/:id', (req, res) => {
  const { id } = req.params
  Actions.get(id)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: 'Sorry, ID not found'
        })
      } else {
        res.status(200).json(data)
      }
    })
    .catch(error => {
      console.log(error)
      res.status(404).json({ message: 'Error: no information could be retrived with id ' + id })
    })
});


router.post('/', [validateAction], (req, res) => {
  Actions.insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error: unable to post',
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
        message: 'Error: unable to update',
      });
    });
});

router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then(data => {
      res.status(200).json({ message: 'Success: item was deleted.' });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error: unable to delete',
      });
    });
});




function validateAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message: 'Your request must include notes, id, description'
    })
  } else {
    next();
  }
}

module.exports = router;