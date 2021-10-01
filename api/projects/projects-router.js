const express = require("express");
const { checkProjectId, validProject } = require("./projects-middleware")
const Project = require("./projects-model")

const router = express.Router();

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
});

router.get('/:id', checkProjectId, (req, res) => {
  res.status(200).json(req.project)
});

router.post('/', validProject, (req, res, next) => {
  Project.insert(req.body)
    .then(() => {
      res.status(201).json(req.body)
    })
    .catch(next)
});

module.exports = router;
