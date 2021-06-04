// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const Projects = require("./projects-model");

//[GET] /api/projects
router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
});

module.exports = router;
