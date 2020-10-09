const Project = require('../../data/helpers/projectModel')

const getProjects = async (req, res, next) => {
  try {
    const allProjects = await Project.get()
    res.status(200).json(allProjects)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProjects,
}
