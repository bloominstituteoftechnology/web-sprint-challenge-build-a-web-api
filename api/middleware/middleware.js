const Actions= require('../actions/actions-model.js');
const Projects = require('../projects/projects-model.js');

const checkProjectsId = async (req,res,next) =>{
    const {id} = req.params
    try{
        const project = await Projects.get(id)
        if(!project){
            res.status(400).json({message:`No project with id: ${id}`})
        }else{
            req.project = project
            next()
        }
    }
    catch(err){
        res.status(500).json(`Server error: ${err}`)
    }
}
const checkActionsId = async (req,res,next) =>{
    const {id} = req.params
    try{
        const action = await Actions.get(id)
        if(!action){
            res.status(400).json({message:`No project with id: ${id}`})
        }else{
            req.action = action
            next()
        }
    }
    catch(err){
        res.status(500).json(`Server error: ${err}`)
    }
}
module.exports={
    checkProjectsId,
    checkActionsId
}