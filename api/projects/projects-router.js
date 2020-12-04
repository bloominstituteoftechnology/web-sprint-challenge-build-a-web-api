const express = require('express')
const Project = require('./projects-model')

const router = express.Router();

router.get('/api/projects', (req, res) => {
    const { query } = req
    Project.get(query)
        .then(projects => {
            res.json(projects)
        })
        .catch(error => {
            console.log(error.message)
            res.json(error.message)
        })
});

router.get('/api/projects', async (req, res) => {
    const { query } = req
    try {
        const projects = await Project.get(query)
        res.json(projects)
    } catch (error) {
        res.json(error.message)
    }
});

router.get('/ap/projects/:id', (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'The project with the specified ID does not exist'})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The project information could not be retrieved' })
        });
});

router.get('/api/projects/:id/actions', (req, res) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            if (actions.length < 0) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({ message: 'The project with the specified ID does not exist' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'the action information could not be retrieved' })
        })
});



module.exports = router
