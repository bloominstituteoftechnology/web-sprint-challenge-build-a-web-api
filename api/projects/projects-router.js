// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const { validateId } = require("./projects-middleware");
const router = express.Router();

//{name:___, description:____, completed:____}
// - [ ] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects ? [...projects] : []);
  } catch (err) {
    next(err);
  }
});

// - [ ] `[GET] /api/projects/:id`
//   - Returns a project with the given `id` as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
router.get("/:id", validateId, async (req, res, next) => {
  try {
    res.status(200).json({ ...req.project });
  } catch (err) {
    next(err);
  }
});

// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.post("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
  res.status(201).json({ message: `[POST] /api/projects/` });
});

// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put("/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
  res.status(201).json({ message: `[PUT] /api/projects/${req.params.id}` });
});

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
