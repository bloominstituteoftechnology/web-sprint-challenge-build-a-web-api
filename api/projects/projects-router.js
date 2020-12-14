const express = require('express');
const projects = require('./projects-model');

const router = express.Router();

// Using try/catch instead of .then().catch()

router.get('/', async (req, res) => {
    try {
        const result = await projects.get();
        res.status(200).json(result);
    } catch {
        res.status(500).json({ message: "There has been an error with the database." });
    }
});

router.get('/:id', validateProjectID(), async (req, res) => {
    res.status(200).json(req.project);
});

/* This endpoint is for retrieving ONLY the actions of a specified project */
router.get('/:id/actions', validateProjectID(), async (req, res) => {
    res.status(200).json(req.project.actions);
});

router.post('/', validateProject(), async (req, res) => {
    try {
        const newProject = await projects.insert(req.body);
        res.status(201).json(newProject);
    } catch {
        res.status(500).json({ message: "There has been an error with the database." });
    }
});

router.put('/:id', validateProjectID(), async (req, res) => {
    const { id } = req.params;

    try {
        const updatedProject = await projects.update(id, req.body);
        res.status(202).json(updatedProject);
    } catch {
        res.status(500).json({ message: "There has been an error with the database." });
    }
});

router.delete('/:id', validateProjectID(), async (req, res) => {
    const { id } = req.params;

    try {
        await projects.remove(id);
        res.status(200).json({ message: "Project deleted." });
    } catch {
        res.status(500).json({ message: "There has been an error with the database." });
    }
});

/* MIDDLEWARE */
function validateProject (req, res, next) {
    return function (req, res, next) {
        if (!req.body.name || !req.body.description) {
            return res.status(400).json({ message: "Missing required field." })
        }

        next();
    };
};

function validateProjectID (req, res, next) {
    return async function (req, res, next) {
        const { id } = req.params;

        try {
            const result = await projects.get(id);

            if (result <= 0) {
                return res.status(404).json({ message: "No project with specified ID." })
            }

            req.project = result;
            next();
        } catch {
            res.status(500).json({ message: "There has been an error with the database." });
        }
    };
};

// EXPORT
module.exports = router;