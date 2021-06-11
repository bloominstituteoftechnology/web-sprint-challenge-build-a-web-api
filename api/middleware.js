const projects = require('./projects/projects-model');
const actions = require('./actions/actions-model');


const validateProjectId = async (req, res, next) => {
    try{
        const projectId = req.params.id;
        const project = await projects.getById(projectId);
        if(!project){
          res.status(404).json([]);
        }else{
          req.project = project;
          next();
        }

    }catch(error){
      res.status(500).json({message: 'Error'})
    }
  
}

const validateActionId = async (req, res, next) => {
    try{
        const actionId = req.params.id;
        const action = await actions.getById(actionId);
        if(!action){
          res.status(404).json([]);
        }else{
          req.action = action;
          next();
        }

    }catch(error){
      res.status(500).json({message: 'Error'})
    }
  
}

const validateProject = (req, res, next) => {
    const newProject = req.body
    if(!newProject.name || !newProject.description){
      res.status(400).json({message: 'missing required fields'})
    }else{
      next();
    }
  }

  const validateAction = (req, res, next) => {
    const newAction = req.body
    if(!newAction.project_id || !newAction.description || !newAction.notes){
      res.status(400).json({message: 'missing required fields'})
    }else{
      next();
    }
  }

 
module.exports = {
    validateProjectId,
    validateActionId,
    validateProject,
    validateAction


}

