const express = require('express');
const Project = require('./projects-model');
const {
  validateProjectsId,
  validateProjects,
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could Not Retrieve Projects',
      });
    });
});

router.get('/:id', validateProjectsId, (req, res) => {
  res.status(200).json(req.project);
});

router.post('/', validateProjects, (req, res) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not insert project',
      });
    });
});

router.put('/:id', validateProjects, validateProjectsId, (req, res) => {
  Project.update(req.params.id, req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not update project',
      });
    });
});

router.delete('/:id', validateProjectsId, (req, res) => {
  Project.remove(req.params.id)
    .then((count) => {
      res.status(200).json({
        message: 'The project has been deleted',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not delete project',
      });
    });
});

router.get('/:id/actions', validateProjectsId, (req, res) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not retrieve actions',
      });
    });
});

module.exports = router;
