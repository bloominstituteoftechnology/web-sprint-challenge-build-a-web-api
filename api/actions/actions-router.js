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

router.put("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wrong in the actions router",
  });
});

module.exports = router;
