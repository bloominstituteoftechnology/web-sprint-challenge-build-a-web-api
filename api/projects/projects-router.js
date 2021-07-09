// Write your "projects" router here!
const express = require ('express');

const Project = require('../projects/projects-model');

const {
    validatePost,
    validateProjectId,
    validateProject
} = require('../projects/projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
});

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.project);
});

router.post('/', validatePost, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next);
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(project => {
            res.json(req.project);
        }) 
        .catch(next);
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(next);
  });

module.exports = router;