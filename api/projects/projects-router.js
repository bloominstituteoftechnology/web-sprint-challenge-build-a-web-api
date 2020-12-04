const express = require('express')
const Projects = require('./projects-model')
const middlewares = require('../.././middlewares/middlewares')

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error.message)
            res.status(500).json({ message: 'Error retrieving the projects' })
        });
});

router.get('/:id', middlewares.validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.get('/:id/actions', middlewares.validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
                res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error getting the actions from the project' })
        })
});

router.post('/', middlewares.validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was a error while saving the project to the database' })
        })
});

router.put('/:id', middlewares.validateProject, middlewares.validateProjectId, (req, res) => {
    const changes = req.body;
    Projects.update(req.params.id, changes)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The project information could not be modified' })
        })
});

router.delete('/:id', middlewares.validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            count > 0
                res.status(200).json({ message: 'The project has been deleted' })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The project could not be removed' })
        })
});

module.exports = router
