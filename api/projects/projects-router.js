// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const Action = require("../actions/actions-model");
const {
  validateProjectId,
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

// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
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

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.
router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions ? [...actions] : []);
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
