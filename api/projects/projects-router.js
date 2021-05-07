const express = require("express");
const { validateProject, validateID } = require("../middleware");
const Projects = require("./projects-model");

const router = express.Router();

router.use("/:id", (req, _res, next) =>
  validateID(Projects, "project", req, next)
);

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => res.status(200).json(projects))
    .catch(next);
});

router.get("/:id", (req, res) => res.status(200).json(req.idResult));

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => res.status(201).json(newProject))
    .catch(next);
});

router.put("/:id", validateProject, (req, res, next) => {
  const id = req.params.id;

  Projects.update(id, req.body)
    .then((updatedProject) => res.status(201).json(updatedProject))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.get("/:id/actions", (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => res.status(200).json(actions))
    .catch(next);
});

module.exports = router;
