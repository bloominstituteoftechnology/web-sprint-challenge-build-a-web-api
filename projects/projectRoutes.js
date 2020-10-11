const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
    db.get().then(projects=>{
        res.status(200).json(projects);
    }).catch(err=>{
        res.status(500).json({message: "A server error occurred"});
    });
});

router.get("/:id", (req, res)=>{
    db.get(req.params.id).then(project=>{
        if(!project) return res.status(404).json({message: "Project doesn't exist"})
        res.status(200).json(project);
    }).catch(err=>{
        res.status(500).json({message: "A server error occurred"});
    })
});

router.put("/:id", (req, res)=>{
    const changes = req.body;
    if(!changes) res.status(400).json({messages: "Required info missing"});
    db.update(req.params.id, changes).then(updatedProject=>{
        if(!updatedProject) return res.status(404).json({message: "Project does not exist"});
        res.status(201).json(updatedProject);
    }).catch(err=>{
        res.status(500).json({message: "A server error occurred"});
    })
});

module.exports = router;
