const express = require('express');
const db = require('../helpers/projectModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
  db.insert(req.body)
    .then(project => {
      res.status(201).json({data: project});
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

router.get('/:id', validateProjectId, (req, res) => {
  db.get(req.params.id)
    .then(project => {
      res.status(200).json({data: project});
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

router.get('/', (req, res) => {
    db.get()
      .then(projects => {
        res.status(200).json({data: projects});
      })
      .catch(err => {
        res.status(500).json({message: err.error});
      })
  });

router.get('/:id/actions', validateProjectId, (req, res) => {
  db.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json({data: actions});
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

router.delete('/:id', validateProjectId, (req, res) => {
  db.remove(req.params.id)
    .then(() => {
      res.status(200).json({data: req.project.name + " removed."})
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  db.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json({data: req.body});
    })
    .catch(err => {
      res.status(500).json({message: err.error});
    })
});

//custom middleware

function validateProject(req, res, next) {
  console.log(req.body);
  if (!req.body){
    return res.status(400).json({message: 'Missing project data.'})
  } else if (!req.body.name) {
    return res.status(400).json({message: 'Missing required name field.'});
  } else if (!req.body.description) {
    return res.status(400).json({message: 'Missing required description field.'});
  }

  next();
}

function validateProjectId(req, res, next){
  db.get(req.params.id)
    .then(project => {
      console.log(project);
      if (project){
        req.project = project;
        return next();
      } 
      return res.status(404).json({message: 'Project not found.'});
    })
    .catch(err => {
      return res.status(400).json({message: 'Invalid Project ID.'});
    })
}

module.exports = router;
