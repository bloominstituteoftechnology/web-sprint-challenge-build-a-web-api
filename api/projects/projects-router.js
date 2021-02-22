
const express = require("express");
const router = express.Router();

const projectDb = require("../helpers/projectModel");

router.get("/", (req, res) => {
    projectDb
        .get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err =>
            res.status(500).json({
                message: "Error retrieving projects."
            })
        );
});

router.get("/:id", checkProjectId(), (req, res) => {
    projectDb
        .get(req.params.id)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            res.status(500).json({
                message: "Project not found."
            });
        });
});


router.get("/:id/actions", checkProjectId(), (req, res) => {
    projectDb
        .getProjectActions(req.params.id)
        .then(action => {
            res.json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "There was an error retrieving the actions."
            });
        });
});


router.post("/", checkRequestBody(), (req, res) => {
    projectDb
        .insert(req.body)
        .then(project => {
            res.json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "There was an error adding your project."
            });
        });
});


router.put("/:id", checkProjectId(), checkRequestBody(), (req, res) => {
    if (req.body.completed !== true || req.body.completed !== "false") {
        res.status(400).json({
            message: "Please send a completed status"
        });
    }
    if (req.body.completed === "false") {
        req.body.completed = false;
    }
    projectDb
        .update(req.params.id, req.body)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "There was an error updating your project"
            });
        });
});




function checkProjectId() {
    return (req, res, next) => {
        projectDb
            .get(req.params.id)
            .then(project => {
                if (project) {
                    next();
                } else {
                    res.status(404).json({
                        message: "The project does not exist"
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "There was an error retrieving the project."
                });
            });
    };
}

function checkRequestBody() {
    return (req, res, next) => {
        console.log(req.method);
        if (
            req.method === "POST" &&
            (!req.body.name || !req.body.description)
        ) {
            return res.status(400).json({
                message: "Please provide a name and description"
            });
        }
        if (req.method === "PUT" && !req.body.completed) {
            return res.status(500).json({
                message: "Please provide a completed status"
            });
        }
        next();
    };
}

module.exports = router;