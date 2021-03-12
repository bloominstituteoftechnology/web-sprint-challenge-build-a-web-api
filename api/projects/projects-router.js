// Write your "projects" router here!
const express = require("express");
const {
  validateProjectId,
  validateProject,
} = require("../middleware/projects-middleware");
const Project = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wrong in the projects router",
  });
});

module.exports = router;
