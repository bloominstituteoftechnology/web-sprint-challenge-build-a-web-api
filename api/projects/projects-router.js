// Write your "projects" router here!
const express = require('express');
const projectData = require('./projects-model');
const router = express.Router();

router.use(express.json())

router.get('/', (req, res) => {
  projectData.get()
    .then((success) => {
      res.status(200).json({ success });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Can not get project.' });
    });
});

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(500).json({ message: 'Name and description required.' });
  } else {
    projectData
      .insert(req.body)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: 'Error adding!' });
      });
  }
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id || !changes) {
    res.status(500).json({ message: 'ID and changes required.'});
  } else {
    projectData
      .update(id, changes)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: 'Oops, user not found.'});
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: 'ID required!'});
  } else {
    projectData
      .remove(id)
      .then((success) => {
        res.status(200).json({ message: 'User successfully removed.', success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: 'User could not be removed!' });
      });
  }
});

// router.get('/projectRouters', (req, res) => {
//   const { project_id } = req.body;
//   console.log(project_id);
//   if (!project_id) {
//     res.status(500).json({ message: 'Project ID needed!' });
//   } else {
//     projectData
//       .getProjectRouters(project_id)
//       .then((success) => {
//         res.status(200).json({ success });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(404).json({ message: 'Something went wrong! Error!' });
//       });
//   }
// });
router.get('/:id/actions', (req, res) => {
  projectData.getProjectActions()
  .then(success => 
      res.status(200).json(success))
  .catch(err => 
      res.status(500).json({ message: 'There was an error'}))
})

module.exports = router; 