/* eslint-disable */
const express = require("express");

const Action = require("./actions/actions-model");

const {
  validatePost,
  validateActionId,
  validateAction,
} = require("./actions/actions-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", validatePost, (req, res, next) => {
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then((action) => {
      res.json(req.action);
    })
    .catch(next);
});

module.exports = router;
