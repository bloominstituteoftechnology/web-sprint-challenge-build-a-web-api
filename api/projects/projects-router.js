// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const db = require("./projects-model");
const { validateProjectId } = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(201).json(projects);
  } catch {
    res.status(500).json({ messege: "Server issues" });
  }
});

router.get("/:id", validateProjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.get(id);
    res.status(201).json(action);
  } catch {
    res.status(500).json({ messege: "Server issues" });
  }
});

router.post("/", async (req, res) => {
  const project = req.body;
  if (project) {
    try {
      const newProject = await db.insert(project);
      res.status(201).json(newProject);
    } catch {
      res.status(500).json({ messege: "Server issues" });
    }
  } else {
    res
      .status(400)
      .json({ messege: "Incomplete informartion for the request" });
  }
});

router.put("/:id", validateProjectId, async (req, res) => {
  const project = req.body;
  const { id } = req.params;
  if (action) {
    try {
      const updatedProject = await db.update({ id, project });
      res.status(201).json(updatedProject);
    } catch {
      res.status(500).json({ messege: "Server issues" });
    }
  } else {
    res
      .status(400)
      .json({ messege: "Incomplete informartion for the request" });
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.remove(id);
    res.status(201).json(project);
  } catch {
    res.status(500).json({ messege: "Server issues" });
  }
});

module.exports = router;
