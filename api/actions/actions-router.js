// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");
const router = express.Router();

// Validate project ID
function validateProjectID(req, res, next) {
  Projects.get(req.params.id).then((data) => {
    if (!data) {
      res.status(404).json({ message: "Invalid project ID" });
    } else {
      res.id = data;
      next();
    }
  });
}

// ENDPOINTS

// [GET] /api/actions returns an array of actions (or an empty array) as the body of the response.
router.get("/api/actions", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting actions" });
    });
});

//[GET] /api/actions/:id returns an action with the given id as the body of the response.
router.get("/api/actions/:id", (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      next({
        code: 404,
        message: `Action ${req.params.id} does not exist`,
      });
    });
});

//[POST] /api/actions returns the newly created action as the body of the response.
router.post("/api/actions", validateProjectID, (req, res, next) => {
  Actions.insert({ ...req.body, project_id: req.params.id }).then((action) => {
    res.status(201).json(action);
  });
});

//[PUT] /api/actions/:id returns the updated action as the body of the response.
router.put("/api/actions/:id", (req, res, next) => {
  Actions.update(req.body).then((action) => {
    res.status(201).json(action);
  });
});

//[DELETE] /api/actions/:id returns no response body.
router.delete("/api/actions/:id", (req, res, next) => {
  Actions.remove(req.params.id).then(() => {
    res.status(204);
  });
});
module.exports = router;
