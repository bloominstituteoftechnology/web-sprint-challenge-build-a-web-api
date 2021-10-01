const express = require("express");

const { validateProjectId, validateProject } = require("./projects-middleware");
const Projects = require("./projects-model");

const router = express.Router();

// [GET] /api/projects
router.get("/", (req, res, next) => {
  Projects.get()
    .then((projectArray) => {
      res.status(200).json(projectArray);
    })
    .catch(next);
});

//  [GET] /api/projects/:id
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.user);
});

//  [POST] /api/projects
router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

//  [PUT] /api/projects/:id
router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch(next);
});

//  [DELETE] /api/projects/:id
router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(next);
});

//  [GET] /api/projects/:id/actions
router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

module.exports = router;
