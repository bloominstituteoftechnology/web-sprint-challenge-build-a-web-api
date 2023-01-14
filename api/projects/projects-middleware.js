// add middlewares here related to projects
const Projects = require('./projects-model');

async function checkProjectId(req, res, next){
    try {
        const project = await Projects.get(req.params.id);
        if(project){
            req.project = project;
            next();
        }else{
            next({ status: 404, message: `Project ${req.params.id} not found`})
        }
    } catch (error) {
        next(error)
    }
}

async function checkNewProject(req,res,next){
    const { name, description, completed } = req.body;
    if(name !== undefined &&
         typeof name === 'string' &&
         name.length &&
         name.trim().length &&
         description !== undefined &&
         description.length &&
         description.trim().length &&
         completed !== undefined){
        next()
    }else{
        res.status(400).json({
            message: 'project needs a name and description'
        })
    }
}

module.exports = {
    checkProjectId,
    checkNewProject,
}