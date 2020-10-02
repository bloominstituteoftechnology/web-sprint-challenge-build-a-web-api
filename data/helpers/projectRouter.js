const express = require('express');
const Project = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(400).json({ message: 'Projects not found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving project',
        });
    });
});

router.get('/:id', (req, res) => {
    Project.get(req.params.id)
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(400).json({ message: 'Project not found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving project',
        });
    });
});

router.post('/', (req, res) => {
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error adding project'
        });
    });
});

router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'Project has been deleted' });
        } else {
            res.status(400).json({ message: 'Project could not be found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error removing Project' 
        });
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Project.update(req.params.id, changes)
    .then(project => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(400).json({ message: 'Project could not be found'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error updating project' 
        });
    })
})

router.get('/:id/actions', (req, res) => {
    Project.getProjectActions(req.params.id)
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(400).json({ message: 'Project not found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving project',
        });
    });
});

module.exports = router;