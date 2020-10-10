const express = require('express')
const router = express.Router()

// Controller
const ProjectController = require('./project.controller')

// Validation

const validate = require('../../middlewares/validate')

router.route('/').get(ProjectController.getProjects)
router
  .route('/:id')
  .get(validate.validateProjectsById, ProjectController.getProjectsById)

module.exports = router
