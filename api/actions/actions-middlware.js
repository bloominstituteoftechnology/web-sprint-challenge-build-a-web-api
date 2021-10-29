// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const yup = require('yup')

const actionSchema = yup.object().shape({
    project_id: yup
        .number()
        .required(),
    description: yup 
        .string()
        .trim()
        .required(),
    notes: yup 
        .string()
        .trim()
        .required()
})

async function validateAction(req, res, next) {
    try{
        const getProject = await Projects.get(req.params.project_id)
        const validated = await actionSchema.isValid(req.body)
        if(!getProject) {
            res.status(404).json({
                message: "Project not found"
            })
        }
        if(!validated) {
            res.status(400).json({ message: "Project id, description, and notes required"})
        }
    }catch (err) {
        next(err)
    }
    
}
async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
            if (action) {
                req.action = action
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
    validateAction,
    validateActionId,
}