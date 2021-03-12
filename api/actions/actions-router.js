// Write your "actions" router here!
const express = require("express");
const {
  validateActionId,
  validateAction,
} = require("../middleware/actions-middleware");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
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
      res.status(200).json(action);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wrong in the actions router",
  });
});

module.exports = router;
