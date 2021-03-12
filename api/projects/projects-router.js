// Write your "projects" router here!
const express = require("express");
const {
  validateProjectId,
  validateProject,
} = require("../middleware/projects-middleware");
const Project = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", (req, res, next) => {});

router.put("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wrong in the projects router",
  });
});

module.exports = router;
