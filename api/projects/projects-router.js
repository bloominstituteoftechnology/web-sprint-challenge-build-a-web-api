const express = require('express');
const ProjectFuncs = require('./projects-model');

const router = express.Router();


// [GET] /api/projects sends an array of projects (or an empty array) as the body of the response.
router.get("/", (req, res) => {
    ProjectFuncs.get()
    .then(success => {
        res.status(200).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

// [GET] /api/projects/:id sends a project with the given id as the body of the response.
router.get("/:id", (req, res) => {
    const { id } = req.params;

    ProjectFuncs.get(id)
    .then(success => {
        if(!success){
            res.status(404).json({ message: `post with id ${id} does not exist.` })
        } else {
            res.status(200).json(success)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

// [POST] /api/projects sends the newly created project as the body of the response.
router.post("/", (req, res) => {

    if(!req.body.name || !req.body.description){
        res.status(400).json({ message: "missing required info, either name or description."})
    } else {
        ProjectFuncs.insert(req.body)
        .then(success => {
            res.status(201).json(success)
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    }
})

// [PUT] /api/projects/:id sends the updated project as the body of the response.
router.put("/:id", (req, res) => {
    const { id } = req.params;

    if(!req.body.name || !req.body.description){
        res.status(400).json({ message: "req.body missing either name or description to be updated."})
    } else{
        ProjectFuncs.update(id, req.body)
        .then(success => {
            res.status(200).json(success)
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    }

})

// [DELETE] /api/projects/:id sends no response body.
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    ProjectFuncs.remove(id)
    .then(success => {
        if(success > 0) {
            res.status(200).json({ message: `successfully deleted post id ${id}`})
        } else {
            res.status(404).json({ message: `post with id ${id} does not exist.` })
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

// [GET] /api/projects/:id/actions sends an array of actions (or an empty array) as the body of the response.
router.get("/:id/actions", (req, res) => {
    const { id } = req.params;

    ProjectFuncs.getProjectActions(id)
    .then(success => {
        res.status(200).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;
