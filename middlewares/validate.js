const Joi = require('joi')

const Actions = require('../data/helpers/actionModel')
const Projects = require('../data/helpers/projectModel')
const actionSchema = require('../validation/actionSchema')
const projectSchema = require('../validation/projectSchema')

const validateActionById = async (req, res, next) => {
  const {id} = req.params
  const action = await Actions.get(id)

  if (!action)
    return res
      .status(404)
      .json({message: 'Action with the specified ID does not exist.'})

  try {
    req.action = action
    next()
  } catch (error) {
    next(error)
  }
}

const validadeAction = (req, res, next) => {
  if (!req.body) return res.send(400).json({message: 'missing user data'})
  if (!req.body.description || !req.body.notes || !req.body.completed)
    return res.send(400).json({message: 'missing required fields'})
}

const validateCreateActionData = (req, res, next) => {
  const result = actionSchema.validate(req.body)

  if (Object.keys(req.body).length === 0)
    return res.status(400).json({message: 'Body request may not be empty'})

  if (result.error)
    return res.status(400).json({message: result.error.details[0].message})

  try {
    next()
  } catch (error) {
    next(error)
  }
}

// Projects Validation
const validateProjectsById = async (req, res, next) => {
  const {id} = req.params
  const action = await Projects.get(id)

  if (!action)
    return res
      .status(404)
      .json({message: 'Project with the specified ID does not exist.'})

  try {
    req.action = action
    next()
  } catch (error) {
    next(error)
  }
}

const validateProjectId = async (req, res, next) => {
  const {project_id} = req.body
  const action = await Projects.get(project_id)

  if (!action)
    return res
      .status(404)
      .json({message: 'Project with the specified porject_id does not exist.'})

  try {
    req.action = action
    next()
  } catch (error) {
    next(error)
  }
}

const validateCreateProjectData = (req, res, next) => {
  const result = projectSchema.validate(req.body)

  if (Object.keys(req.body).length === 0)
    return res.status(400).json({message: 'Body request may not be empty'})

  if (result.error)
    return res.status(400).json({message: result.error.details[0].message})

  try {
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateActionById,
  validateProjectsById,
  validadeAction,
  validateCreateActionData,
  validateProjectId,
  validateCreateProjectData,
}
