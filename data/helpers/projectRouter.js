const express = require("express");
const projects = require("./projectModel.js");
const router = express.Router();

router.get("/", (req, res) => {
    projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "Error fetching project." })
        })
})

router.post("/", validateProject, (req, res) => {
    projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error)
        })
})

router.delete("/:id", validateId, (req, res) => {
    projects.remove(req.params.id)
    .then(project => {
        if (project > 0 ) {
            res.status(200).json(project);
        } else{
            res.status(400).json({ message: "Project not found." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "Error deleting project." })
    })
})

router.put("/:id", validateId, (req, res) => {
    const id = req.params;
    const data = req.body;

    projects.update(id, data)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
        })
})

// custom middleware
function validateId(req, res, next) {
    projects.getProjectActions(req.params.id)
    .then(project => {
        if(project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ message: "Invalid project ID." })
        }
    })
}

function validateProject(req, res, next) {
    projects.get(req.params.id)
    .then(project => {
        if (req.name || req.description) {
            next();
        } else{
            res.status(404).json({ message: "Project not found." })
        }    
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error retrieving the project" });
    })
}

module.exports = router;