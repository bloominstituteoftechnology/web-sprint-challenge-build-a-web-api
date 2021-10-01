const express = require("express");
const { checkActionId, validAction } = require("./actions-middlware")
const Action = require("./actions-model")

const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get()
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
});

router.get("/:id", checkActionId, (req, res) => {
  res.status(200).json(req.action)
});

router.post("/", validAction, (req, res, next) => {
  Action.insert(req.body)
    .then(() => {
      res.status(201).json(req.body)
    })
    .catch(next)
});



router.delete("/:id", checkActionId, (req, res, next) => {
  const { id } = req.params;
  Action.remove(id)
    .then(() => {
      res.status(200).json({ message: `Deleted action ${id}` });
    })
    .catch(next);
});

module.exports = router;
