const express = require('express')
const router = express.Router()
const ProjectModel = require('./projects-model')

router.get('/', (req, res) => {
  ProjectModel.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  ProjectModel.get(id)
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: err.message });
    });
});


router.post('/', (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Missing required information!' })
  }
  ProjectModel.insert(req.body)
    .then(projects => {
      res.status(201).json(projects)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params
  const change = req.body
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Missing required information!' });
  }
  ProjectModel.update(id, change)
    .then(projects => {
      res.status(200).json(change)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  ProjectModel.remove(id)
    .then(projects => {
      res.status(200).json({ message: 'Success: Project destroyed!' });
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: '500: Project could not be destroyed.'});
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params
  ProjectModel.getProjectActions(id)
      .then(projectId => {
          if(projectId){
              res.status(200).json(projectId)
          }
          else{
            res.status(404).json({ message: '404: Can not locate the action!'});
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({ message: err.message })
      })
})


module.exports = router