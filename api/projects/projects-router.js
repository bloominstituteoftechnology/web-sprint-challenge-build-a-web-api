// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model.js");

// ENDPOINTS

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

// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.
router.get("/api/projects", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting all projects" });
    });
});

// [GET] /api/projects/:id returns a project with the given id as the body of the response.
router.get("/api/projects/:id", validateProjectID, (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 404, message: `Project ${req.params.id} does not exist` });
    });
});

//[GET] /api/projects/:id/actions returns an array of actions (or an empty array) as the body of the response.
router.get("/api/projects/:id/actions", (req, res, next) => {
  Projects.getProjectActions(req.params.id).then((actions) => {
    res.status(200).json(actions);
  });
});

// [POST] /api/projects returns the newly created project as the body of the response.
router.post("/api/projects", (req, res, next) => {
  Projects.insert(req.body).then((project) => {
    res.status(201).json(project);
  });
});

// [PUT] /api/projects/:id returns the updated project as the body of the response.
router.put("/api/projects/:id", (req, res, next) => {
  Projects.update(req.params.id, req.body).then((project) => {
    res.status(201).json({ project });
  });
});

// [DELETE] /api/projects/:id returns no response body.
router.delete("/api/projects/:id", (req, res, next) => {
  Projects.remove(req.params.id).then(() => {
    res.status(204).json({});
  });
});

module.exports = router;
