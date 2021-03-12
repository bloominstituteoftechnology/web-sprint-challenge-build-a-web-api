const express = require('express');
const Project = require('./projects-model')
const { validateProjectsId } = require('../middleware/middleware')

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

module.exports = router;
