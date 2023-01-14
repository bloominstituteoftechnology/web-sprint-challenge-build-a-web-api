// add middlewares here related to actions
const Actions = require('./actions-model')
const Project = require('../projects/projects-model')


async function checkActionId(req, res, next){
    try {
        const action = await Actions.get(req.params.id);
        if(action){
            req.action = action;
            next();
        }else{
            next({ status: 404, message: `Action ${req.params.id} not found`})
        }
    } catch (error) {
        next(error)
    }
}

async function checkNewAction(req,res,next){
    const { description, notes } = req.body;
    if(description !== undefined &&
         typeof description === 'string' &&
         description.length &&
         description.trim().length &&
         description.length < 129 &&
         notes !== undefined &&
         notes.length &&
         notes.trim().length){
        next()
    }else{
        res.status(400).json({
            message: 'Action needs a name, valid project id and description'
        })
    }
}

async function checkValidProject(req,res,next){
    const { project_id } = req.body
    const validProject = await Project.get(project_id)
    try {
        if(validProject){
            next();
        }else{
            next({ status: 404, message: `Project ${project_id} not found`})
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    checkActionId,
    checkNewAction,
    checkValidProject
}