const express = require('express');
const {
  theProjects,
  validateProjectId,
  validateProject,
  updateProject,
  deleteProjects,
  arrayOfActions
} = require('./projects-middleware');
const Project = require('./projects-model');
const Action = require('../actions/actions-model');
const router = express.Router();

router.get('/api/projects', theProjects,(req, res) => {
  res.json(req.project)
});

router.get('/api/projects/:id', validateProjectId, (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
});

router.post('/api/projects', validateProject, (req, res, next) => {
  Project.insert({ name: req.name, description: req.description })
  .then()
  .catch(next)
});

router.put('/:id', updateProject, (req, res, next) => {
  Project.update(req.params.id, { name: req.name, description: req.description })
  .then(() => {
    return Project.update(req.params.id)
  })
  .then(projects => {
    res.json(projects)
  })
  .catch(next)
});

router.delete('/:id', deleteProjects, async (req, res, next) => {
  try {
    await Project.remove(req.params.id)
    res.json(res.project)
  } catch (err) {
    next(err)
  }
});

router.get('/api/projects/:id/actions', arrayOfActions, async (req, res, next) => {
  try {
    const result = await Action.getProjectActions(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
});

module.exports = router;