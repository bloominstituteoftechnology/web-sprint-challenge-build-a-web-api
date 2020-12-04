// Write your "projects" router here!
const express = require('express');
const ProjectModel = require('./projects-model');
const router = express.Router();

router.get('/', (req, res) => {
  ProjectModel.get(req.params.id)
  .then((getProjects) => {
    if (getProjects) {
      res
        .status(200)
        .json({ message: 'List of Projecs', Project_List: getProjects });
    } else {
      res.status(404).json({ message: 'Can not locate list of Projects' });
    }
  })
  .catch((error) => {console.log(error)
    res.status(500).json({ message: 'Can not get List of Projects' });
});
});

router.get('/:id', (req, res) => {
  ProjectModel.get(req.params.id)
    .then((projectID) => {
      if (projectID) {
        res
          .status(200)
          .json({ message: 'Project by ID', Project_ID: projectID });
      } else {
        res
          .status(404)
          .json({ message: `Can't find Project Id# ${req.params.id}` });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: '500 error: Can not get List of Projects' });
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  ProjectModel.getProjectActions(id)
    .then((projectID) => {
      if (projectID) {
        res
          .status(200)
          .json({ message: 'Project by ID', ActionID_in_project: projectID });
      } else {
        res
          .status(404)
          .json({ message: `can't find Project Id#${req.params.id}` });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: '500 error: Can not get List of Projects'});
    });
});

router.post('/', (req, res) => {
  ProjectModel.insert(newPost)
    .then((newProject) => {
      if (newProject) {
        res.status(201).json({
          message: 'Posted successfully',
          project_posted_success: newProject,
        });
      } else {
        res
          .status(404)
          .json({ message: `Can't post project, error${newPost}` });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: '500 error: Can not post projec'});
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  ProjectModel.update(id, changes)
    .then((updateProject) => {
      if (updateProject) {
        res.status(200).json({
          message: `Success, project ID# ${id} updated`,
          project_updated: updateProject,
        });
      } else {
        res.status(404).json({ message: `Cant update project, 404 error` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: '500 ERROR: something went wrong, Can not update project'
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  ProjectModel.remove(id)
    .then((removeProject) => {
      if (removeProject) {
        res.status(200).json({
          message: `Success, project #${id} deleted`,
          project_deleted: removeProject,
        });
      } else {
        res.status(404).json({ message: `Cant update user, 404 error` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: '500 ERROR: Cant delete project',
      });
    });
});

module.exports = router;







// router.get('/', (req, res) => {
//   projectData.get()
//     .then((success) => {
//       res.status(200).json({ success });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: 'Can not get project.' });
//     });
// });

// router.post('/', (req, res) => {
//   if (!req.body.name || !req.body.description) {
//     res.status(500).json({ message: 'Name and description required.' });
//   } else {
//     projectData
//       .insert(req.body)
//       .then((success) => {
//         res.status(201).json({ success });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(404).json({ message: 'Error adding!' });
//       });
//   }
// });

// router.put('/:id', (req, res) => {
//   const id = req.params.id;
//   const changes = req.body;
//   if (!id || !changes) {
//     res.status(500).json({ message: 'ID and changes required.'});
//   } else {
//     projectData
//       .update(id, changes)
//       .then((success) => {
//         res.status(201).json({ success });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(404).json({ message: 'Oops, user not found.'});
//       });
//   }
// });

// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   if (!id) {
//     res.status(500).json({ message: 'ID required!'});
//   } else {
//     projectData
//       .remove(id)
//       .then((success) => {
//         res.status(200).json({ message: 'User successfully removed.', success });
//       })
//       .catch((error) => {
//         console.log(error);
//         res.status(404).json({ message: 'User could not be removed!' });
//       });
//   }
// });

// // router.get('/projectRouters', (req, res) => {
// //   const { project_id } = req.body;
// //   console.log(project_id);
// //   if (!project_id) {
// //     res.status(500).json({ message: 'Project ID needed!' });
// //   } else {
// //     projectData
// //       .getProjectRouters(project_id)
// //       .then((success) => {
// //         res.status(200).json({ success });
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         res.status(404).json({ message: 'Something went wrong! Error!' });
// //       });
// //   }
// // });
// router.get('/:id/actions', (req, res) => {
//   projectData.getProjectActions()
//   .then(success => 
//       res.status(200).json(success))
//   .catch(err => 
//       res.status(500).json({ message: 'There was an error'}))
// })

// module.exports = router; 