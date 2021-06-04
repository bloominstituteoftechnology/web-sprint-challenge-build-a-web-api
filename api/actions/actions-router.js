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

// `[POST] /api/actions`
router.post("/", async (req, res) => {
  const body = req.body;
  if (!body.description || !body.notes) {
    res.status(400).json({ message: "please fill in all required fields" });
  } else {
    try {
      const newAction = await Actions.insert(body);
      res.status(201).json(newAction);
    } catch (err) {
      res.status(500).json({ Error: { err } });
    }
  }
});

// `[PUT] /api/actions/:id`
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!body.description && !body.notes) {
    res.status(400).json({ message: "please fill in all the required fields" });
  } else {
    try {
      const updatedAction = await Actions.update(id, body);
      res.status(200).json(updatedAction);
    } catch (err) {
      res.status(500).json({ Error: { err } });
    }
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id).then((removedAction) => {
    if (!removedAction) {
      res.status(404).json({ message: "nope" });
    } else {
      res.json(removedAction);
    }
  });
});

module.exports = router;
