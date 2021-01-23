// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const db = require("./actions-model");
const { validateActionId } = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(201).json(actions);
  } catch {
    res.status(500).json({ messege: "Server issues" });
  }
});

router.get("/:id", validateActionId, async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.get(id);
    res.status(201).json(action);
  } catch {
    res.status(500).json({ messege: "Server issues" });
  }
});

router.post("/", async (req, res) => {
  const action = req.body;
  if (action) {
    try {
      const newAction = await db.insert(action);
      res.status(201).json(newAction);
    } catch {
      res.status(500).json({ messege: "Server issues" });
    }
  } else {
    res
      .status(400)
      .json({ messege: "Incomplete informartion for the request" });
  }
});

router.put("/:id", validateActionId, async (req, res) => {
  const action = req.body;
  const { id } = req.params;
  try {
    const updatedAction = await db.update(id, action);
    res.status(201).json(updatedAction);
  } catch {
    res.status(500).json({ messege: "Server issues" });
  }
});

router.delete("/:id", validateActionId, async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.remove(id);
    res.status(201).json(action);
  } catch {
    res.status(500).json({ messege: "Server issues" });
  }
});

module.exports = router;
