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

router.post('/', validateProject(), async (req, res) => {
    try {
        const newPost = await projects.insert(req.body);
        res.status(201).json(newPost);
    } catch {
        res.status(500).json({ message: "There has been an error with the database." });
    }
});

router.put('/:id', validateProjectID(), async (req, res) => {
    const { id } = req.params;

    try {
        const updatedPost = await projects.update(id, req.body);
        console.log(updatedPost);
        res.status(200).json(updatedPost);
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
            return res.status(202).json({ message: "Missing required field." })
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