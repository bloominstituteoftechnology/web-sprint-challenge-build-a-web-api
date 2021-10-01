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

 module.exports = {
     validateProject
 }