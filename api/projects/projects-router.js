// Write your "projects" router here!


const express = require("express");
const projects =require("./projects-model")
const router = express.Router();

router.get("/", (req, res) => {
  projects.get()
  .then((projects) => {
    res.status(200).json(projects);
  });
});







router.post("/", (req, res) => {
  projects
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the project",
      });
    });
});

router.put("/:id", (req, res) => {
  projects
    .update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Could not find the project" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the project",
      });
    });
});

router.delete("/", (req, res) => {
  projects
    .remove(req.params.id)
    .then((project) => {
      if (project > 0) {
        res.status(200).json({
          message: "the project is removed",
        });
      } else {
        res.status(404).json({
          message: "the project is not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the project",
      });
    });
});

module.exports = router;
