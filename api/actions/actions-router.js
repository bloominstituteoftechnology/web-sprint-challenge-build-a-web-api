// Write your "actions" router here!
const express = require('express');

const {
    handleError,
    validateID,
    validatePost
} = require('./actions-middlware');

const Actions = require('./actions-model');

const router = express.Router();

//[GET] /api/actions
router.get('/', (req, res, next) => {
    Actions.get()
      .then(actions => {
        res.status(200).json(actions)
      })
      .catch(next)
  });

//[GET] /api/actions/:id
router.get('/:id', validateID, (req, res, next) => {
    res.status(200).json(req.action)
})

//[POST] /api/actions
router.post('/', validatePost, (req, res, next) => {
    const newAction = {
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes
    }
    Actions.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})

//[PUT] /api/actions/:id
router.put('/:id', validatePost, validateID, (req, res, next) => {
    Actions.update(req.params.id, req.body)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(next);
  });

//[DELETE] /api/actions/:id
router.delete('/:id', validateID, (req, res, next) => {
    Actions.remove(req.params.id)
      .then(() => {
        res.status(200);
      })
      .catch(next);
  });

  router.use(handleError);

  module.exports = router;