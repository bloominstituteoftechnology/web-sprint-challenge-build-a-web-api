 const Project = require('./projects-model')


 function validateProject(req, res, next) {
     const { name, description } = req.body
     if (!name || !description) {
         res.status(400).json({
             message: "Name and description is required"
         })
     } else {
        req.name = name
        req.description = description
        next()
     }
 }

 async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: "No project was found"
            })
        } else {
            res.status(200).json(project)
        }
      } catch (error) {
        next(error)
      }
    }
 

 module.exports = {
     validateProject,
     validateProjectId
 }