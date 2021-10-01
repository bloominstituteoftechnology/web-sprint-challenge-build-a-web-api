const express = require("express");
const { 
  checkProjectId, 
  validProject, 
  checkCompleted 
} = require("./projects-middleware")
const Project = require("./projects-model")

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
});

router.get("/:id", checkProjectId, (req, res) => {
  res.status(200).json(req.project)
});

router.post("/", validProject, (req, res, next) => {
  Project.insert(req.body)
    .then(() => {
      res.status(201).json(req.body)
    })
    .catch(next)
});

router.put("/:id", checkProjectId, checkCompleted, (req, res, next) => {
  const { id } = req.params;
  Project.update(id, req.body)
    .then(() => {
      return Project.get(id)
    })
    .then(() => {
      res.status(200).json(req.body)
    })
    .catch(next)
});

router.delete("/:id", checkProjectId, (req, res, next) => {
  const { id } = req.params;
  Project.remove(id)
    .then(() => {
      res.status(200).json({ message: `Deleted project ${id}` });
    })
    .catch(next);
});

// work on later
router.get("/:id/actions", checkProjectId, (req, res, next) => {
  Project.get(req.params.id)
    .then(() => {
      res.json(req.body)
    })
    .catch(next)
});

module.exports = router;
