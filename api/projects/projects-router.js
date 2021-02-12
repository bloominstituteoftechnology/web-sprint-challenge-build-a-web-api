// Write your "projects" router here!
const express = require("express");
const { route } = require("../server");
const Projects = require("./projects-model");
const router = express.Router();
const mw = require("../middleware/middleware");

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({ message: `Server Error:${error}` });
    });
});
router.get("/:id", mw.validateProjectId, (req, res) => {
  const id = req.params.id;
  Projects.getbyId(id)
  .then((project) => {
    res.status(200).json(project);
  });
});
router.post('/', mw.validateProjectBody,(req,res)=>{
    const project = req.body;
    Projects.insert(project)
    .then((projects)=>{
        res.status(201).json(projects)
    })
})
router.put('/:id', mw.validateProjectBody,mw.validateProjectId,(req,res)=>{
    const changes = req.body
    const id = req.params.id
    Projects.update(id, changes)
    .then((projects)=>{
        res.status(202).json(projects)
    })
})

router.delete('/:id', mw.validateProjectId,(req,res)=>{
    const id =req.params.id;
    Projects.remove(id)
    .then((projects)=>{
        res.status(203).json({message:`Project:${id} has been deleted from the Database.`})
    })
})
router.get('/:id/actions',mw.validateProjectId,(req,res)=>{
    const projectId = req.params.id;
    Projects.getProjectActions(projectId)
    .then((actions)=>{
        res.status(200).json(actions);
    })
})
module.exports = router;
