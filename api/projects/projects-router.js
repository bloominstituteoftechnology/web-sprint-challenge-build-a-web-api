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

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProject, (req, res, next) => {
  const id = req.params.id;
  req.body = { ...req.body, id: id };

  Projects.update(id, req.body)
    .then((updatedProject) => {
      res.status(201).json(updatedProject);
    })
    .catch(next);
});

module.exports = router;
