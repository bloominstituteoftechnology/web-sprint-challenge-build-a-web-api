const express = require('express');
// const {
// } = require('../middleware/middleware');
const Project = require('./projects-model');
// const Action = require('../actions/actions-model')
const router = express.Router();

router.get('/api/projects', (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
});

module.exports = router;