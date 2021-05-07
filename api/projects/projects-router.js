const express = require("express");
const {
  validateProject,
  // validateAction,
} = require("../middleware");
const Projects = require("./projects-model");

const router = express.Router();

// router.use("/:id", (req, _res, next) =>
//   validateProject(Project, "project", req, next)
// );

router.get("/", (req, res, next) => {
  console.log("here");
  Projects.get()
    .then((projects) => res.status(200).json(projects))
    .catch(next);
});

module.exports = router;
