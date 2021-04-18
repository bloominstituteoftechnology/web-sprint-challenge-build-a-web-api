// Write your "actions" router here!

const express = require("express");
const actions = require("./actions-model");
const router = express.Router();

router.get("/", (req, res) => {
  actions.get().then((actions) => {
    res.status(200).json(actions);
  });
});

router.post("/", (req, res) => {
  actions
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the action",
      });
    });
});

router.put("/:id", (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "Could not find the action" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the action",
      });
    });
});

router.delete("/", (req, res) => {
  actions
    .remove(req.params.id)
    .then((action) => {
      if (action > 0) {
        res.status(200).json({
          message: "the action is removed",
        });
      } else {
        res.status(404).json({
          message: "the action is not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the action",
      });
    });
});

module.exports = router;
