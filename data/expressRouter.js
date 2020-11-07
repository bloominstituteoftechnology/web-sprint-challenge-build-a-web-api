const express = require('express');

const router = express.Router();
const Action = require('./helpers/actionModel');
const Project = require('./helpers/projectModel');

router.get('/', (req, res) => {
    res.status(201).json({message:'success'})
  });

router.get('/:id', (req, res) => {

    Project.get(req.params.id)
    .then(user => {
        if(user){
            res.status(201).json(user) 
        } else { res.status(404). json({message: 'no id found '})}
       
    })
    .catch(error => {
        res.status(500).json({ message: "error retrieving"})
    })
  });

  router.get('/:id/actions', (req, res) => {

    Project.get(req.params.id.actions)
    .then(user => {
        if(user){
            res.status(201).json(user) 
        } else { res.status(404). json({message: 'no id found '})}
       
    })
    .catch(error => {
        res.status(500).json({ message: "error retrieving"})
    })
  });


router.post('/', validateBody, (req, res) => {
    Project.insert(req.body)
    .then( user => {
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json({message:"Post Error"})
    })
})

router.post('/:id/actions', (req, res) => {
const actionInfo = {...req.body, project_id: req.params.id}
    if (actionInfo) {
    Action.insert(actionInfo)
    .then( user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(404).json({message:" missing field, project_id, description, & notes required"})
    })
} else res.status(500).json({message:" err0r with api"})
});

router.put('/:id', (req, res) => {
    
    Project.update(req.params.id, req.body)
    .then(user => {
        if (req.body) {
            res.status(201).json(user)
        } else {
            res.status(404).json({message: "error updating "})
        }
    })
    .catch(err => {
        res.status(500).json({message: "error updating"})
    })
})

router.put('/:id/actions', (req, res) => {
    
    Action.update(req.params.id, req.body)
    .then(user => {
        if (req.body.notes) {
            res.status(201).json(user)
        } else {
            res.status(404).json({message: "error updating"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "error wit api"})
    })
})


router.delete('/:id', (req, res) => {

    Project.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The project has been deleted' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(error => {
        res.status(500).json({message: "error with api"})
    })
})

router.delete('/:id/actions', (req, res) => {

    Action.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The action has been deleted' });
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    })
    .catch(error => {
        res.status(500).json({message: "error with api"})
    })
})





function validateBody(req, res, next) {
  if (req.body.name && Object.keys(req.body.name).length > 0 ){
    next();
  } else {
    res.status(400).json({message: 'Name and Description required field '})
  }
}



function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id)
  .then(user => {
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({message: 'id not found'})
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message:'error with request'})
  })
}

module.exports = router;