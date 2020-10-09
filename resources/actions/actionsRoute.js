const express = require('express')
const router = express.Router()

// Controller
const ActionsController = require('./actions.controller.js')

// Validation

const validate = require('../../middlewares/validate')
const {validateActionById} = require('../../middlewares/validate')

router
  .route('/')
  .get(ActionsController.getActions)
  .post(validate.validateCreateActionData, ActionsController.createAction)

router
  .route('/:id')
  .get(validate.validateActionById, ActionsController.getActionsById)
  .put(
    validate.validateActionById,
    validate.validateCreateActionData,
    ActionsController.updateAction
  )

module.exports = router
