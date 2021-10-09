// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();
const {
  validateProjectId,
  validateRequestBody,
} = require("./projects-middleware");
console.log("projects running");

router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      if (!project) {
        res.status(404).json([]);
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to get Projects" });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to get Projects" });
    });
});

router.post("/", validateRequestBody, (req, res) => {
  const newProject = req.body;
  Projects.insert(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(() => {
      res.status(500).json({ message: "There was an error adding project." });
    });
});

router.put("/:id", validateProjectId, validateRequestBody, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (req.body.completed === undefined) {
    res.status(400).json({ message: "Requires the completed field." });
  } else {
    Projects.update(id, changes)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "There was an error updating the user." });
      });
  }
});

router.delete("/:id", validateProjectId,(req,res)=>{
    const {id} = req.params;
    Projects.remove(id)
    .then((project)=>{
        res.status(200).json(project)
    }).catch(()=>{
        res.status(500).json({message:"Unable to delete user."})
    })
})

router.get("/:id/actions", validateProjectId, (req,res)=>{
    const {id}= req.params;
    Projects.getProjectActions(id)
    .then((project)=>{
        res.status(200).json(project)
    }).catch(()=>{
        res.status(500).json({message:"Unable to get project actions."})
    })
})


module.exports = router;
