// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const ActionModel = require('./actions-model');

router.get('/', (req, res) => {
  ActionModel.get(req.params.id)
    .then((actions) => {
      if (actions) {
        res
          .status(200)
          .json({ message: 'List of Actions', Action_List: actions });
      } else {
        res.status(404).json({ message: `can't retrieve list of actions` });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Can not get List of actions' });
    });
});

router.get('/:id', (req, res) => {
  ActionModel.get(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json({ message: 'Action by Id', ActionById: actions });
      } else
        res.status(404).json({ message: `Can't find id by #${req.params.id}` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Server Error: cant find action by ID'});
    });
});

router.post('/', (req, res) => {
  const newUser = req.body;
  ActionModel.insert(newUser)
    .then((postUser) => {
      if (postUser) {
        res
          .status(201)
          .json({ message: 'New user posted', user_posted: postUser });
      } else {
        res.status(404).json({ message: `Cant post a user, check req.body` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: '500 error: something went wrong, cant not post action',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  ActionModel.update(id, changes)
    .then((updateAction) => {
      if (updateAction) {
        res.status(200).json({
          message: 'Success, user updated',
          action_updated: updateAction,
        });
      } else {
        res.status(404).json({ message: `Cant update user, 404 error` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: '500 ERROR: something went wrong, Can not update action',
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  ActionModel.remove(id)
    .then((removeUser) => {
      if (removeUser) {
        res
          .status(200)
          .json({ message: 'Success, user deleted', user_deleted: removeUser });
      } else {
        res.status(404).json({ message: `Cant update user, 404 error` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: '500 ERROR: something went wrong, Can not delete user',
      });
    });
});

module.exports = router;















// router.get(':/id', (req, res) => {
//     const id = req.params.id
//     if (!id) {
//         res.status(500).json({ message: 'ID is required!' })
//     } else {
//         actions
//             .get(id)
//             .then((success) => {
//                 res.status(200).json({ success });
//             })
//             .catch((err) => {
//                 res.status(404).json({ message: 'Oops, there was an error.'})
//             });
//     }
// });

// router.post('/', (req, res) => {
//     const { project_id, description, notes } = req.body;
//     if (!project_id || !description || !notes) {
//       res
//         .status(500)
//         .json({ message: 'Make sure to provide project ID, description & notes.'});
//     } else if (description.length > 127) {
//       res
//         .status(500)
//         .json({ message: 'Description has to be less than 128 characters.' });
//     } else {
//       actions
//         .insert(req.body)
//         .then((success) => {
//           res.status(201).json({ success });
//         })
//         .catch((err) => {
//           console.log(err);
//           res
//             .status(404)
//             .json({ message: 'Request not completed.' });
//         });
//     }
// });

// router.put('/:id', (req, res) => {
//     const id = req.params.id;
//     const changes = req.body;
//     if (!id) {
//       res.status(500).json({ message: 'ID required!' });
//     } else {
//       actions
//         .update(id, changes)
//         .then((success) => {
//           res.status(200).json({ success });
//         })
//         .catch((err) => {
//           res.status(404).json({ message: ' Oops, there was an error.' });
//         });
//     }
// });

// router.delete('/:id', (req, res) => {
//     const id = req.params.id;
//     if (!id) {
//       res.status(500).json({ message: 'ID required!' });
//     } else {
//       actions
//         .remove(id)
//         .then((success) => {
//           res.status(200).json({ success });
//         })
//         .catch((err) => {
//           console.log(err);
//           res
//             .status(404)
//             .json({ message: 'Couldnt delete at the moment' });
//         });
//     }
//   });
  
//   module.exports = router;