const express = require("express");
const { checkProjectId, validProject } = require("./projects-middleware")
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

router.post('/', validProject, (req, res, next) => {
  Project.insert(req.body)
    .then(() => {
      res.status(201).json(req.body)
    })
    .catch(next)
});

router.put('/:id', checkProjectId, validProject, (req, res, next) => {
  const { id } = req.params;
  Project.update(id, {
    name: req.name, 
    description: req.description, 
    completed: req.completed 
  })
    .then(() => {
      return Project.getById(id)
    })
    .then(updatedProject => {
      res.json(updatedProject)
    })
    .catch(next)
});

router.delete('/:id', checkProjectId, (req, res, next) => {
  const { id } = req.params;
  Project.remove(id)
    .then(() => {
      res.status(200).json({ message: `Deleted project ${id}` });
    })
    .catch(next);
});

module.exports = router;
