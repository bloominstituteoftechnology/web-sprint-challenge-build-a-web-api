const express = require("express");
const projectModel = require('../helpers/projectModel');
const router = express.Router();

//Create 
router.post("/", (req, res) => {
    //const projectInfo = req.body // where the insertion goes in  -  as raw json
    projectModel
        .insert(req.body)
        .then(project => {
            res.status(200).send(project);
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong while adding the project!", err })
        })
});

//Read - Works

router.get('/', (req, res) => {
    projectModel
        .get(req.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving projects" })
        })
})


//Update 

router.put("/:id", (req, res) => {
    // const projectInfo = req.body;
    // const { id } = req.params
    console.log(req.body)
    projectModel
        .update(req.params.id, req.body)
        .then(project => {
            if (project) {
                res.status(200).json({ message: "The project has been updated!" })
            } else {
                res.status(404).json({ message: "There is nothing to update" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "there was an error updating the project"})
        })
})


//Delete 

router.delete("/:id", (req, res) => {
    projectModel
        .remove(req.params.id)
        .then(e => {
            if (e > 0) {
                res.status(200).json({ message: "The project has been deleted" })
            } else {
                res.status(404).json({ message: "project cannot be found" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting the project" })
        })
})

//get Project Actions - Works
router.get("/:id/actions", (req, res) => {
    projectModel
        .getProjectActions(req.params.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving actions for this show" })
        })
})




module.exports = router;