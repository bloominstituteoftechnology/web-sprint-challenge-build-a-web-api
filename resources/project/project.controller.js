const Projects = require('../../data/helpers/projectModel')

/**
 * Show all Projects
 *
 * @param
 * @method GET
 * @route /api/projects
 */
const getProjects = async (req, res, next) => {
  try {
    const allProjects = await Projects.get()
    res.status(200).json(allProjects)
  } catch (error) {
    next(error)
  }
}

/**
 * Show all Projects by passing an ID
 *
 * @param $ID
 * @method GET
 * @route /api/projects
 */
const getProjectsById = async (req, res, next) => {
  const {id} = req.params
  try {
    const project = await Projects.get(id)
    res.status(200).json(project)
  } catch (error) {
    next(error)
  }
}

/**
 * Create a new project
 *
 * @param
 * @method POST
 * @route /api/projects
 */
const createProject = async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body)
    res.status(201).json(newProject)
  } catch (error) {}
}

/**
 * Update a single project by passing an ID
 *
 * @param $ID
 * @method PUT
 * @route /api/projects/ @ID
 */
const updatedProject = async (req, res, next) => {
  const {id} = req.params
  try {
    await Projects.update(id, req.body)
    res
      .status(200)
      .json({message: `Project with the Id# ${id} has been updated`})
  } catch (error) {
    next(error)
  }
}

/**
 * Delete a single Project by passing an ID
 *
 * @param $ID
 * @method DELETE
 * @route /api/projects @ID
 */

const deleteProject = async (req, res, next) => {
  const {id} = req.params
  try {
    await Projects.remove(id)
    res.status(200).json({
      message: `Project with the Id# ${id} has been removed`,
      text: req.body.text,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get a list of actions for a single Project
 *
 * @param $PROJECT_ID
 * @method GET
 * @route /api/@PROJECT_ID /actions
 */

const getProjectByActions = async (req, res, next) => {
  const {id} = req.params
  try {
    const projectActions = await Projects.getProjectActions(id)
    if (projectActions.length === 0) {
      return res
        .status(200)
        .json({message: ' No actions for this project yet...'})
    }
    res.status(200).json(projectActions)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProjects,
  getProjectsById,
  createProject,
  updatedProject,
  deleteProject,
  getProjectByActions,
}
