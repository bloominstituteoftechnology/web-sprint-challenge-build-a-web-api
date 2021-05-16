const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')

const checkProjectsId = async (req,res,next) => {
 const {id} = req.params
 try {
  const project = await Projects.get(id)
  if(!project){
   res.status(400).json({message:`theres no project with id: ${id}`})
  }else{
   req.project = project
   next()
  }
 }
 catch(err){
  res.status(500).json(`Server error: ${err}`)
 }
}

const checkProjectsValidation = (req,res,next) =>{
    if (!req.body.description) {
        res.status(400).json({ message: 'description required' })
    } else {
        next()
    }
}

const checkActionsId = async (req,res,next) => {
 const {id} = req.params
 try{
  const action = await Actions.get(id)
  if(!action){
   res.status(400).json({message:`no project found with id: ${id}`})
  }else{
   req.action = action
   next()
  }
 }
 catch(err){
  res.status(500).json(`server error: ${err}`)
 }
}

const checkActionValidation = (req,res,next) =>{
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'user requires both name and description' })
    } else {
        next()
    }
}

module.exports={
 checkActionsId,
 checkProjectsId,
 checkProjectsValidation,
 checkActionValidation
}