const express = require("express");
const { checkProjectId } = require("./projects-middleware")
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

module.exports = router;
