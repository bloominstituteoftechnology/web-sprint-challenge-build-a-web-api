// Write your "projects" router here!
const express = require('express');

const {
    handleError,
    validateID,
    validatePost
} = require('./projects-middleware');

const Projects = require('./projects-model');

const router = express.Router();

//[GET] /api/projects
router.get('/', (req, res, next) => {
    Projects.get()
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(next)
  });

//[GET] /api/projects/:id
router.get('/:id', validateID, (req, res, next) => {
    res.status(200).json(req.project)
})

//[POST] /api/projects
router.post('/', validatePost, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

//[PUT] /api/projects/:id
router.put('/:id', validatePost, validateID, (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(next);
  });

//[DELETE] /api/projects/:id
router.delete('/:id', validateID, (req, res, next) => {
    Projects.remove(req.params.id)
      .then(() => {
        res.status(200);
      })
      .catch(next);
  });

//[GET] /api/projects/:id/actions
router.get('/:id/actions', validateID, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status.json(actions);
        })
        .catch(next);
})

router.use(handleError);

module.exports = router;