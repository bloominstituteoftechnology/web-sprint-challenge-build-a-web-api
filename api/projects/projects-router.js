// Write your "projects" router here!
const express = require('express');
const {
    validateProjectId,
} = require('./projects-middleware')

const Projects = require('./projects-model');
const router = express.Router();


router.get('/api/projects', (req, res) => {
    Projects.get()
        .then(proj => {
            res.json(proj)
        })
        .catch(err => {
            res.json({

            })
        })
});

router.get('/api/projects/:id', validateProjectId, async (req, res) => {
 try {
      const projId = await Projects.get(req.params.id)
  if(!projId) {
      res.status(404).json({message: "project not found"})
  } else {
      res.json(projId)
  }
}catch (err) {
    res.status(500).json({message: "somthing went worn"})
}
})
