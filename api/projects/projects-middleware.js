const Projects = require('./projects-model');
const yup = require('yup');

function logger(req, res, next) {
    console.log(`
        ${req.method} request to ${req.baseUrl} endpoint
    `);
    next();
}

async function validateProjectId(req, res, next) {
    const project = await Projects.get(req.params.id);
    if (!project) {
        res.status(404).json({
            message: "no project found",
        });
    } else {
        req.project = project;
        next();
    }
}

const projectSchema = yup.object({
    name: yup.string().trim().required(),
    description: yup.string().trim().required(),
    completed: yup.bool(),
})

async function validateProject(req, res, next) {
    try {
        const validatedProject = await projectSchema.validate(req.body, {
            stripUnknown: true,
        });
        req.body = validatedProject;
        next();
    } catch (err) {
        res.status(400).json({
            message: "name and description fields required"
        })
    }
}
    
module.exports = { logger, validateProjectId, validateProject };