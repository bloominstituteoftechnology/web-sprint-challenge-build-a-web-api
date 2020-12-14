const express = require('express');
const actions = require('./actions-model');
const projects = require('../projects/projects-model');

const router = express.Router();

router.get('/', (req, res) => {
    actions.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({ message: "There has been an error with the database." });
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    actions.get(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({ message: "There has been an error with the database." });
        });
});

router.post('/', validateAction(), async (req, res) => {
    // CHECK TO MAKE SURE THAT PROJECT_ID BELONGS TO AN EXISTING PROJECT
    try {
        const project = await projects.get(req.body.project_id);
        if (!project || project.length <= 0) {
            return res.status(404).json({ message: "No project with that specified ID." })
        }

    } catch {
        res.status(500).json({ message: "There has been an error with the database." });
    }

    actions.insert(req.body)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(() => {
            res.status(500).json({ message: "There has been an error with the database." });
        })
});

router.put('/:id', validateActionID(), (req, res) => {
    const { id } = req.params;

    actions.update(id, req.body)
        .then(changes => {
            res.status(201).json(changes);
        })
        .catch(() => {
            res.status(500).json({ message: "There has been an error with the database." });
        })
});

router.delete('/:id', validateActionID(), (req, res) => {
    const { id } = req.params;

    actions.remove(id)
        .then(() => {
            res.status(200).json({ message: "Action deleted."})
        })
        .catch(() => {
            res.status(500).json({ message: "There has been an error with the database." });
        });
});

/* MIDDLEWARE */
function validateAction (req, res, next) {
    return function (req, res, next) {
        if (!req.body || !req.body.project_id || !req.body.description || !req.body.notes) {
            return res.status(400).json({ message: "Missing required field." });
        }

        next();
    };
};

function validateActionID (req, res, next) {
    return function (req, res, next) {
        const { id } = req.params;

        actions.get(id)
            .then((result) => {
                if (result <= 0) {
                    return res.status(404).json({ message: "No action with specified ID." })
                }

                req.action = result;
                next();
            })
            .catch(() => {
                res.status(500).json({ message: "There has been an error with the database." });
            });
    };
};

// EXPORT
module.exports = router;