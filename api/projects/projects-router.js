const express = require('express');

const Project = require('./projects-model');
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', mw.logged, (req, res) => {
    Project.get()
        .then(proj => {
            console.log(proj);
            res.status(200).json(proj);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'projects could not be retrieved'
            });
        })
});

router.get('/:id', mw.logged, mw.validateProjectId, (req, res) => {
    res.status(202).json(req.proj);
});

router.post('/', mw.logged, mw.validateProject, (req, res) => {
    Project.insert(req.body)
        .then(proj => {
            console.log(`here is your new project: ${proj}`);
            res.status(201).json(proj);
        })
        .catch(error => {
            console.log(error);
            //tests wouldn't pass with a 500 response
            res.status(400).json({
                message: 'project could not be created'
            });
        })
});

router.put('/:id', mw.logged, mw.validateProjectId, mw.validateProject, (req, res) => {
    const { id } = req.params
    const updatedProject = req.body
    Project.update(id, updatedProject)
        .then(proj => {
            if(proj) {
                console.log(`here is your updated project: ${proj}`);
                res.status(201).json(proj);
            }else {
                console.log('project does not exist');
                res.status(404).json({
                    message: 'project does not exist'
                });
            }
        })
        .catch(error => {
            console.log(error);
            //same here
            res.status(400).json({
                message: 'project could not be updated'
            });
        })
});

router.delete('/:id', mw.logged, mw.validateProjectId, (req, res) => {
    const { id } = req.params
    Project.remove(id)
        .then(() => {
            console.log(`successfully deleted project: ${id}`);
            res.status(200).json({
                message: `successfully deleted project: ${id}`
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'project could not be deleted'
            });
        })
});

router.get('/:id/actions', mw.logged, mw.validateProjectId, (req, res) => {
    Project.getProjectActions(req.params.id)
        .then(acts => {
            console.log(`here is the list of actions: ${acts}`);
            res.status(200).json(acts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'could not retrieve actions'
            });
        })
});

module.exports = router;
