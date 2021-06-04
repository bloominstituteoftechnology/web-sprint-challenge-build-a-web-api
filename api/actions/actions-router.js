// Write your "actions" router here!
const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");

// `[GET] /api/actions`
router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch((err) => {
      res.json({ stack: err.stack });
    });
});

// `[GET] /api/actions/:id`
router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action === null) {
        res.status(404).json({ message: "error" });
      } else {
        res.json(action);
      }
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
});

module.exports = router;
