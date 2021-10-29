// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const {
  validateId,
  validateNewProject,
  validateExistingProject,
} = require("./projects-middleware");
const router = express.Router();

//{name:___, description:____, completed:____}

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects ? [...projects] : []);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
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
  validateId,
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

// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.
router.delete("/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
  res.status(201).json({ message: `[DELETE] /api/projects/${req.params.id}` });
});

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.
router.get("/:id/actions", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
  res
    .status(200)
    .json({ message: `[GET] /api/projects/${req.params.id}/actions` });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custMessage: "Error Occured retrieving /api/actions path",
    message: err.message,
  });
});

module.exports = router;
