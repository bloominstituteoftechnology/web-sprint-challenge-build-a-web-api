const express = require("express");
const { checkActionId } = require("./actions-middlware")
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



module.exports = router;
