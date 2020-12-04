const express = require('express');

const Projects = require('./projects-model');


const router = express.Router();

router.get('/', (req, res) => {
    Projects.get(req.query.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error retrieving the projects' })
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error retrieving the project with id: ' + id })
        })
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(error => {
            // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error adding the project',
            });
        });
});

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error updating the project',
            });
        });
});

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(data => {
            res.status(200).json({ message: 'The project has been nuked' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error removing the hub',
            });
        });
});

// ---- Nested Routes??? ---- Figure out how to do this! Imports?
// SEE README LINE 108
// Dont need middleware, just add an isValid function to validate

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error retrieving the projects' })
        })
});


module.exports = router;


