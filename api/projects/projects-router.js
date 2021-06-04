// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const Projects = require("./projects-model");

//[GET] /api/projects
router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
});

// `[GET] /api/projects/:id`
router.get("/:id", async (req, res) => {
  try {
    const projectById = await Projects.get(req.params.id);
    if (!projectById) {
      res.status(404).json({ message: "no project found" });
    } else {
      res.json(projectById);
    }
  } catch (error) {
    res.status(500).json({ message: "problem finding user" });
  }
});

// `[POST] /api/projects`
router.post("/", (req, res) => {
  const { name, description } = req.body;
  Projects.insert(req.body)
    .then((newProject) => {
      if (!name || !description) {
        res.status(400);
      } else {
        res.json(newProject);
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
