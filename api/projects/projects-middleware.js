// add middlewares here related to projects
const Project = require('../projects/projects-model')

async function validateProjectId(req, res, next) { 
    try {
        const { id } = req.params
        const project = await Project.get(id)
        if (project) {
            req.project = project
            next()
        } else {
            next({
                status: 404,
                message: 'project not found'
            })
        }
    } catch (err) {
        next(err)
    }
}

async function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({
            message: 'missing required name field'
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: 'missing required description field'
        })
    }
    // adding in an else if to check for completed breaks the first two project PUT tests
    else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
 }

// async function validateProjectPut(req, res, next) {
//     const { name, description, completed } = req.body
//     if ( name && description && completed ) {
//         req.name = name
//         req.description = description
//         req.completed = completed
//         next()
//     } else {
//         res.status(400).json({
//             message: 'Missing name, description or completed field'
//         })
//     }

// }
 

module.exports = {
    validateProjectId,
    validateProject,
}