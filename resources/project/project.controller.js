const Projects = require('../../data/helpers/projectModel')

const getProjects = async (req, res, next) => {
  try {
    const allProjects = await Projects.get()
    res.status(200).json(allProjects)
  } catch (error) {
    next(error)
  }
}

const getProjectsById = async (req, res, next) => {
  const {id} = req.params
  try {
    const project = await Projects.get(id)
    res.status(200).json(project)
  } catch (error) {
    next(error)
  }
}

const createProject = async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body)
    res.status(201).json(newProject)
  } catch (error) {}
}

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
