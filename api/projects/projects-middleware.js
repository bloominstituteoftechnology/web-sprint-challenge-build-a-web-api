// add middlewares here related to projects
const Projects = require('./projects-model')
const yup = require('yup')

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        prodMessage: 'something went wrong'
    })
}

const projectSchema = yup.object().shape({
    name: yup 
        .string()
        .trim()
        .required('you need to supply name'),
    description: yup
        .string()
        .trim()
        .required('you need to supply description'),
    completed: yup
        .boolean()
        .required()
})

async function validateProject(req, res, next) {
   try {
       const validated = await projectSchema.isValid(req.body);
       if (!validated) {
           res.status(400).json({ message: 'fields are required' })
       } else {
           next();
       }
   } catch (err) {
       next(err);
   }
}

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
            if (project) {
                req.project = project
                next();
            } else {
                res.status(404).json({
                    message: "Project not found"
                })
            }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleError,
    validateProject,
    validateProjectId,
}