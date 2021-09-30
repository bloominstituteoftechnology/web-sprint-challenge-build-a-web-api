 const Project = require('./projects-model')

 async function validateProjectId(req, res, next) {
    try {
        const {id} = req.params
        const project = await Project.getById(id)
        if (!project) {
            res.status(404).json({
                message: "project not found"
            })
        } else {
            req.project = project
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: "Cannot find project"
        })
    }
 }

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

 module.exports = {
     validateProjectId,
     validateProject
 }