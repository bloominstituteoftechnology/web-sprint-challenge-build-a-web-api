// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");
// const {} = require("./actions-middlware");
const router = express.Router();

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get("/", async (req, res) => {
  res.status(100).json({ message: `[GET] /api/actions` });
});

// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
router.get("/:id", async (req, res) => {
  res.status(100).json({ message: `[GET] /api/actions/:id` });
});

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
router.post("/", async (req, res) => {
  res.status(100).json({ message: `[POST] /api/actions` });
});

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put("/:id", async (req, res) => {
  res.status(100).json({ message: `[PUT] /api/actions/:id` });
});

// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.
router.delete("/:id", async (req, res) => {
  res.status(100).json({ message: `[DELETE] /api/actions/:id` });
});

/*
Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:


*/

module.exports = router;
