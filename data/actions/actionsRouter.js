const express = require('express');
const db = require('../helpers/actionModel');


const router = express.Router();

router.post('/project/:id/', validateActionId, validateAction, (req, res) => {
  db.insert({...req.body, project_id: req.params.id})
    .then(action => {
      res.status(201).json({data: action});
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

router.get('/:id', validateActionId, (req, res) => {
  db.get(req.params.id)
    .then(action => {
      res.status(200).json({data: action});
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

router.get('/', (req, res) => {
    db.get()
      .then(actions => {
        res.status(200).json({data: actions});
      })
      .catch(err => {
        res.status(500).json({message: err.error});
      })
  });

router.delete('/:id', validateActionId, (req, res) => {
  db.remove(req.params.id)
    .then( () => {
      res.status(200).json({data: req.action.description + " removed."})
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
  db.update(req.params.id, req.body)
    .then( () => {
      res.status(200).json({data: req.body});
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

//custom middleware

function validateActionId(req, res, next){
  db.get(req.params.id)
    .then(action => {
      console.log(action);
      if (action){
        req.action = action;
        return next();
      } 
      return res.status(404).json({message: 'User not found.'});
    })
    .catch(err => {
      return res.status(400).json({message: 'Invalid user ID.'});
    })
}

function validateAction(req, res, next){
  if (!req.body){
    return res.status(400).json({message: 'Missing action data.'})
  } else if (!req.body.description) {
    return res.status(400).json({message: 'Missing required description field.'});
  } else if (!req.body.notes) {
    return res.status(400).json({message: 'Missing required notes field.'});
  }

  next();
}
module.exports = router;