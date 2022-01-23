const express = require('express');
const router = express.Router();
const Project = require('./projects-model.js');

router.get('/', (req, res) => {
  Project.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Project.get(id)
    .then(id => {
      if (!id) {
        res.status(404).json({ message: 'you lie!'});
      } else {
        res.status(200).json(id);
      }
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  Project.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/', (req, res) => {
  Project.insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Project.update(id, changes)
    .then((project) => {
      if (!project.body.name || !project.body.description) {
        return res.status(400).json({ message: 'sorry'});
      } else {
        res.status(200).json(project);
      }
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
    Project.remove(id)
      .then((id) => {
        if (!id) {
          res.status(404).json({ message: 'you LIE!!'});
        } else {
          res.status(200).json({ message: 'Terminated.' });
        }
    })
    .catch(error => {
      res.status(404).json({ message: error.message });
    });
});

module.exports = router;