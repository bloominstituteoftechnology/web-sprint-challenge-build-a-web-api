const express = require("express");
const projects = require("./projectModel.js");
const router = express.Router();

//get
router.get("/:id", validateId, (req, res) => {
    projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ errorMessage: "Project ID not found" })
        })
})

//post
router.post("/", validateProject, (req, res) => {
    const project = req.params.id;

    projects.insert(project)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error)
        })
})

//delete

//put

// custom middleware
function validateId(req, res, next) {
    projects.get(req.params.id)
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
    projects.get()
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