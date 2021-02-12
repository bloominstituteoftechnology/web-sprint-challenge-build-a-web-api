const Projects = require('../projects/projects-model')
const Actions = require('../actions/actions-model')

//MIDDLEWARE FOR PROJECTS
async function validateProjectId (req, res, next){
    const { id } = req.params
    try{
        const project = await Projects.get(id)
        if(!project){
            res.status(400).json({message: 'Project not found'})
        } else {
            req.project = project
            next()
        }
    } catch(error) {
        res.status(500).json({message: 'Project could not be retrieved'})
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    try{
        if(!name || ! description){
            res.status(400).json({message: 'Missing project data'})
        } else {
            next()
        }
    } catch(error) {
        res.status(400).json({message: 'Missing required inputs'})
    }
}

//MIDDLEWARE FOR ACTIONS
async function validateActionId(req, res, next){
    const { id } = req.params
    try{
        const action = await Actions.get(id)
        if(!action){
            res.status(400).json({message: 'Action not found'})
        } else {
            req.action = action
            next()
        } 
    } catch(error) {
            res.status(400).json({message: 'Action could not be retrieved'})
        }
}

function validateAction(req, res, next){
    const { description, notes } = req.body
    try{
        if(!description || !notes){
            res.status(400).json({message: 'Missing action data'})
        } else {
            next()
        }
    } catch(error){
        res.status(400).json({message: 'Missing required inputs'})
    }
}


module.exports ={
    validateProjectId,
    validateProject, 
    validateActionId,
    validateAction
}