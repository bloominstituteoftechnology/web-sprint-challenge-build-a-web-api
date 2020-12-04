const express = require('express')
const router = express.Router()
const Actionmodel = require('./actions-model')

router.get('/', (req, res) => {
  Actionmodel.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  Actionmodel.get(id)
    .then(actions => {
      if(actions){
        res.status(200).json(actions)
    }
    else{
        res.status(404).json({ message: '404:Error' })
    }
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: err.message });
    });
});

router.post('/', (req, res) => {
  const actions = req.body
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: '400: Missing required information!' });
  }
  Actionmodel.insert(actions)
    .then(actions => {
      res.status(201).json(actions)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: '500: Oops, there was an error adding the actions.' })
    });
});
  
router.put('/:id', (req, res) => {
  const { id } = req.params
  const change = req.body
  Actionmodel.update(id, change)
    .then(actions => {
      if (req.body.project_id && req.body.description && req.body.notes && req.body.completed){
        res.status(200).json(actions)
    } else {
      res.status(400).json({ message: 'Missing required info!' })
    }
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Actionmodel.remove(id)
    .then(actions => {
      if (actions) {
        res.status(200).json({ message: "Success: Action destroyed!" });
      } else {
        res.status(404).json({ message: '404: Could not destroy action with the id'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: '404: Oops, action could not be destroyed.' });
    });
});


module.exports = router