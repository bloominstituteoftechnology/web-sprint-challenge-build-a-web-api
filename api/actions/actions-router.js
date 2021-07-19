// Write your "actions" router here!
// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();

router.use(express.json());

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get('/', (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Actions get all error' });
    });
});

// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (!action) {
        res
          .status(404)
          .json({ message: 'Action with the specified id do not exist' });
      } else {
        res.status(200).json(action);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Actions get id error' });
    });
});

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
router.post('/', (req, res) => {
  if (!req.body.description || !req.body.notes || !req.body.project_id) {
    res.status(400).json({
      message: 'Notes and description and associated project id are required',
    });
  } else {
    Actions.insert(req.body)
      .then((newAction) => {
        res.status(201).json(newAction);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Actions post error' });
      });
  }
});

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put('/:id', (req, res) => {
  if (
    !req.body.notes ||
    !req.body.description ||
    !req.body.completed ||
    !req.body.project_id
  ) {
    res.status(400).json({ message: 'Note and description are required' });
  } else {
    Actions.update(req.params.id, req.body)
      .then((updatedProject) => {
        if (updatedProject) {
          return Actions.get(req.params.id);
        } else {
          res.status(404).json({
            message: 'The action with the specified id does not exist',
          });
        }
      })
      .then((updatedProject) => {
        res.status(200).json(updatedProject);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Actions put error' });
      });
  }
});

// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.
router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then((deletedAction) => {
      if (!deletedAction) {
        res
          .status(404)
          .json({ message: 'The action with the specified id does not exist' });
      } else {
        res.status(200).json();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Actions delete error' });
    });
});

module.exports = router;