// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");
const {
  validateId,
  validateAction: validateNewAction,
  validateProject,
} = require("./actions-middlware");
const router = express.Router();

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get("/", async (req, res) => {
  const actions = await Action.get();
  res.status(200).json({ message: "successfully retrieve actions", actions });
});

// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
router.get("/:id", validateId, async (req, res) => {
  res.status(200).json({ action: req.action });
});

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
router.post(
  "/",
  validateId,
  validateNewAction,
  validateProject,
  async (req, res) => {
    const newAction = await Action.insert(req.newAction);
    res.status(201).json({ newAction });
  }
);

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put(
  "/:id",
  validateId,
  validateNewAction,
  validateProject,
  async (req, res) => {
    const newAction = await Action.update(req.params.id, req.newAction);
    res.status(201).json(newAction);
  }
);

// // - [ ] `[DELETE] /api/actions/:id`
// //   - Returns no response body.
// //   - If there is no action with the given `id` it responds with a status code 404.
// router.delete("/:id", async (req, res) => {
//   res.status(201).json({ message: `[DELETE] /api/actions/:id` });
// });

/*
Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:


*/

module.exports = router;
