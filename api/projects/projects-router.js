const express = require('express');
const projects = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res) => {
    projects.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({ message: "There has been an error with the database." })
        })
});

// EXPORT
module.exports = router;