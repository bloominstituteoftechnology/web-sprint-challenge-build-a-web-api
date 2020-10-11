const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");
const actionsDb = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
    db.get().then(projects=>{
        res.status(200).json(projects);
    }).catch(err=>{
        res.status(500).json({message: "A server error occurred"});
    });
});

router.post("/", (req, res)=>{
    const {name, description} = req.body;
    if(!name || !description) return res.status(400).json({message: "Name and description requried"});
    db.insert(req.body).then(newProject=>{
        res.status(201).json(newProject);
    }).catch(err=>{
        res.status(500).json({message: "A server error occurred"});
    })
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

router.delete("/:id", (req,res)=>{
    db.remove(req.params.id).then(projectId=>{
        if(projectId == 0) return res.status(404).json({message: "Project does not exist"});
        res.status(200).json({message: `project with id ${req.params.id} deleted`});
    }).catch(err=>{
        console.log(err);
    });
});

router.get("/:id/actions", (req, res)=>{
    actionsDb.get().then(actions=>{
        actions = actions.filter(action => action.project_id == req.params.id);
        res.status(200).json(actions);
    }).catch(err=>{
        res.status(500).json({message: "A server error occurred"});
    })
});

module.exports = router;
