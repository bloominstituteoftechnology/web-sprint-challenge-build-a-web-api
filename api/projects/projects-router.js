// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model.js");

//
// MIDDLEWARE
// Error
router.use((err, req, res, next) => {
  console.log("AGH, ERROR!", err);
  res.status(500).json({ message: err.message });
});

//
// ENDPOINTS
//
// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.
router.get("/projects", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting all projects" });
    });
});
//
// [GET] /api/projects/:id returns a project with the given id as the body of the response.
//
router.get("/projects/:id", (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting project" });
    });
});

module.exports = router;
