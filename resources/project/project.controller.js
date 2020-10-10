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

module.exports = {
  getProjects,
  getProjectsById,
}
