const express = require('express');
const projects = require('./helpers/projectModel');


router.get("/projects/:id", (req, res) => {
    projects
        .get(req.params.id)
        .then((project) => {
            res.status(200).json(project)
        })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: "the project with that id does not exist",
                })
            })
        })

router.get("/projects/:id/actions", (req, res) => {
    projects
        .getProjectActions(req.params.id)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The action with that id does not exist"
            })
        })
})

router.get("/projects", (req, res) => {
    projects
        .get()
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Could not get projects",
            })
        })
})

router.post("/projects/:id", (req, res) => {
    projects
        .get()
        .then((project_ => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({
                    message: "Please provide all information",
                })
            } else {
                projects
                    .insert(req.body)
                    .then((project) => {
                        res.status(201).json(project)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            message: "could not add project",
                        })
                    })
            }
        }))
})

router.put("/projects/:id", (req, res) => {
    projects
        .get(req.params.id)
        .then((project) => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({
                    message: "please fill out all info",
                })
            } else {
                projects
                    .update(req.params.id, req.body)
                    .then((project) => {
                        res.status(201).json(req.body)
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "the project info could not be updated"
                        })
                    })
            }
        })
})


router.delete("/projects/:id", (req, res) => {
    projects
        .remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "project successfully deleted",
                })
            } else {
                res.status(404).json({
                    message: "the project with the id does not exist",
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "project could not be deleted"
            })
        })
})

module.exports = router




