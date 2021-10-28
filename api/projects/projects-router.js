// Write your "projects" router here!
const express = require('express');

const {
    handleError,
    validateID
} = require('./projects-middleware')

const Projects = require('../projects/projects-model');

const router = express.Router();

//[GET] /api/projects
router.get('/', (req, res, next) => {
    // RETURN AN ARRAY WITH ALL THE USERS
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

//[PUT] /api/projects/:id

//[DELETE] /api/projects/:id

//[GET] /api/projects/:id/actions

router.use(handleError);

module.exports = router;