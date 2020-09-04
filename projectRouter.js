const express = require('express'); 

const router = express.Router();
const ProjectModel = require('./data/helpers/projectModel');
const ActionModel = require('./data/helpers/actionModel');


router.use((req,res,next)=> {
  console.log('projectRouter yippee');
  next();
})


const logger = require('./logger'); 
router.use(logger);



router.post('/', validateProject, async (req, res) => {
    try {
      const project = await ProjectModel.insert(req.body);
      res.status(201).json(project);
    } catch (error) {
      console.log(error);
      next(({message: 'Error getting the posts for the project'}));
    }
  });

  
  router.post('/:id/actions/:id', validateAction, async (req, res) => {
    const actionInfo = { ...req.body, id: req.params.id };

    try {
      const action = await ActionModel.insert(actionInfo);
      res.status(210).json(action);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'missing action data'
      });
    }
});


router.get('/', async (req, res) => {
    try {
      const projects = await ProjectModel.getter(req.query);
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      next(({message: 'Error retrieving the projects '}))
    }
  });


router.get('/:id', validateProjectId, async (req, res) => {
    try {
        const project = await ProjectModel.get(req.params.id);
    
        if (project) {
          res.status(200).json(project);
        } else {
        next(({message: 'project not found'}))
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error retrieving the project'}))
      }
});


router.get('/:id/actions', validateProjectId, async (req, res) => {
   
    try {
        const actions = await ProjectModel.getProjectActions(req.params.id);
    
        res.status(200).json(actions);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Error getting the messages for the hub',
        });
      }
   
});


router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        const count = await ProjectModel.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The project has been nuked' });
        } else {
          res.status(404).json({ message: 'The project could not be found' });
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error removing the project'}));
      }
});


router.delete('/:id/actions/:id', validateAction, async (req, res) => {
    try {
        const count = await ActionModel.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The action has been nuked' });
        } else {
          res.status(404).json({ message: 'The action could not be found' });
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error removing the project'}));
      }
});


router.put('/:id/', validateProjectId, async (req, res) => {

    try {
        const project = await ProjectModel.update(req.params.id, req.body);
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: 'The project could not be found' });
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error updating the project'}));
      }

});


router.put('/:id/actions/:id', validateAction, async (req, res) => {

    try {
        const action = await ActionModel.update(req.params.id, req.body);
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: 'The action could not be found' });
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error updating the action'}));
      }

});


async function validateProjectId (req, res, next) {
    try{
      const { id } = req.params;
      const project = await ProjectModel.get(id);
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({message: 'invalid project id'});
      }
    } catch (err) {
        next(({message: 'failed to process async request'}));
   
    } 
  
  }


function validateProject(req, res, next) { 
    
    if (req.body && Object.keys(req.body).length) {
    next();
    } else {
    next(({message: 'missing project data'}));
    }
}


function validateAction(req, res, next) {

    if (req.body && Object.keys(req.body).length) {
        next();
        } else {
        next(({message: 'missing required action text field"'}));
        }
};

module.exports = router;