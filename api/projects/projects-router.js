const express = require("express");
const { validateProject, validateID } = require("../middleware");
const Projects = require("./projects-model");

const router = express.Router();

router.use("/:id", (req, _res, next) =>
  validateID(Projects, "project", req, next)
);

router.get("/", (req, res, next) => {
  console.log("here");
  Projects.get()
    .then((projects) => res.status(200).json(projects))
    .catch(next);
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.idResult);
});

module.exports = router;
