const express = require('express')
const router = express.Router()

// Controller
const ActionsController = require('./actions.controller.js')

// Validation

const validate = require('../../middlewares/validate')

router
  .route('/')
  .get(ActionsController.getActions)
  .post(
    validate.validateProjectId,
    validate.validateCreateActionData,
    ActionsController.createAction
  )

router
  .route('/:id')
  .get(validate.validateActionById, ActionsController.getActionsById)
  .delete(validate.validateActionById, ActionsController.deleteAction)
  .put(
    validate.validateActionById,
    validate.validateCreateActionData,
    ActionsController.updateAction
  )

module.exports = router
