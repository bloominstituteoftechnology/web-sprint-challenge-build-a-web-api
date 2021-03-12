const express = require('express');
const Project = require('./projects-model')
const { validateProjectsId, validateProjects } = require('../middleware/middleware')

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

module.exports = router;
