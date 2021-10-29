const express = require("express");
const Project = require("./projects-model");
const {
  validateProjectId,
  validateNewProject,
  validateExistingProject,
} = require("./projects-middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects ? [...projects] : []);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    res.status(200).json({ ...req.project });
  } catch (err) {
    next(err);
  }
});

router.post("/", validateNewProject, async (req, res, next) => {
  try {
    const newProject = await Project.insert(req.newProject);
    res.status(201).json({ ...newProject });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateProjectId,
  validateExistingProject,
  async (req, res, next) => {
    try {
      const updatedProject = await Project.update(
        req.params.id,
        req.existingProject
      );
      res.status(201).json({ ...updatedProject });
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    const deletedProject = await Project.remove(req.params.id);
    res.status(201).json({ ...deletedProject });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const actions = await Project.getProjectActions(req.params.id);
    res.status(200).json(actions.length === 0 ? [] : [...actions]);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custMessage: "Error Occured retrieving /api/actions path",
    message: err.message,
  });
});

module.exports = router;
