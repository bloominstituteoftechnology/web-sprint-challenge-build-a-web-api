// Write your "projects" router here!
const projects = require('./projects-model.js');
const express = require('express');
const router = express.Router();
const mw = require("./projectsmw.js");

router.get("/", (req, res)=>{
    projects.get()
    .then(projects=>{
        res.status(200).json(projects);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})
router.get("/:id", mw.validateProjectID, (req, res)=>{
    res.status(200).json(req.project);
})
router.post("/", mw.validateProjectBody, (req,res)=>{
    projects.insert(req.body)
    .then(project=>{
        res.status(201).json(project);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})
router.put("/:id", mw.validateProjectID, mw.validateProjectBody, (req,res)=>{
    projects.update(req.params.id, req.body)
    .then(project=>{
        res.status(200).json(project);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})
router.delete("/:id", mw.validateProjectID, (req,res)=>{
    projects.remove(req.params.id)
    .then(project=>{
        res.status(200).json(project);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})

router.get('/:id/actions', mw.validateProjectID, (req,res)=>{
    projects.getProjectActions(req.params.id)
    .then(actions=>{
        res.status(200).json(actions);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})

module.exports = router;