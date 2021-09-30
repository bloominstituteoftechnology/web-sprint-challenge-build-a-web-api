const express = require("express");
const {} = require("./projects-middleware")
const Project = require("./projects-model")

const router = express.Router();

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
});

module.exports = router;
