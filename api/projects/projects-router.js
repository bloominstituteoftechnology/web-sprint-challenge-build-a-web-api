// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
// const {} = require("./projects-middleware");
const router = express.Router();

// - [ ] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.
router.get("/", async (req, res) => {
  res.status(200).json({ message: `[GET] /api/projects/` });
});

// - [ ] `[GET] /api/projects/:id`
//   - Returns a project with the given `id` as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
router.get("/:id", async (req, res) => {
  res.status(200).json({ message: `[GET] /api/projects/${req.params.id}` });
});

// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.post("/", async (req, res) => {
  res.status(201).json({ message: `[POST] /api/projects/` });
});

// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put("/:id", async (req, res) => {
  res.status(201).json({ message: `[PUT] /api/projects/${req.params.id}` });
});

// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.
router.delete("/:id", async (req, res) => {
  res.status(201).json({ message: `[DELETE] /api/projects/${req.params.id}` });
});

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.
router.get("/:id/actions", async (req, res) => {
  res
    .status(200)
    .json({ message: `[GET] /api/projects/${req.params.id}/actions` });
});

module.exports = router;
