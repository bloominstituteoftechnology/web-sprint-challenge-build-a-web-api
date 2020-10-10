const express = require('express')
const router = express.Router()

// Controller
const ProjectController = require('./project.controller')

// Validation

const validate = require('../../middlewares/validate')

router
  .route('/')
  .get(ProjectController.getProjects)
  .post(validate.validateCreateProjectData, ProjectController.createProject)
router
  .route('/:id')
  .get(validate.validateProjectsById, ProjectController.getProjectsById)
  .delete(validate.validateProjectsById, ProjectController.deleteProject)
  .put(
    validate.validateProjectsById,
    validate.validateCreateProjectData,
    ProjectController.updatedProject
  )

router
  .route('/:id/actions')
  .get(validate.validateProjectsById, ProjectController.getProjectByActions)

module.exports = router
