// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model')

const router = express.Router();

router.use(express.json());

router.get('/',(req,res) =>{
    Projects.get()
    .then(projects =>{
        if(!projects){
            res.status(200).json([])
        }else{
            res.status(200).json(projects)
        }
    }).catch(() =>{
        res.status(500).json({
            message: "error"
        })
    })
})

router.get("/:id", (req,res) =>{
    Projects.get(req.params.id).then(project =>{
        if(!project){
            res.status(404).json({
                message: "The project with this id was not found"
            })
        }else{
            res.status(200).json(project)
        }
    }).catch(() =>{
        res.status(500).json({
            message: "Error"
        })
    })
})

router.post('/:id/projects', (req, res, next) => {
    Projects.add(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(400).json({
            message: 'Error adding the project',
        });
    });
})

router.put('/:id', (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.completed) {
        res.status(400).json({ message: 'Name and description required' });
    } else {
        Projects.update(req.params.id, req.body)
        .then((updatedProject) => {
            if (updatedProject) {
            return Projects.get(req.params.id);
            } else {
            res.status(404).json({
                message: 'The project with the specified id does not exist',
            });
            }
        })
        .then((updatedProject) => {
            res.status(200).json(updatedProject);
        })
        .catch(() => {
            res.status(500).json({ message: 'error' });
        });
    }
});

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then((deletedProject) => {
            if (!deletedProject) {
            res.status(404).json({
                message: 'The project with this id does not exist',
            });
            } else {
            res.status(200).json();
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'error' });
        });
    });

router.get('/:id/actions', (req, res) => {
    Projects.get(req.params.id)
        .then((actions) => {
            if (!actions) {
            res.status(404).json({
            message: 'The project with this id does not exist',
        });
            } else {
            Projects.getProjectActions(req.params.id).then((actions) => {
            res.status(200).json(actions);
        });
        }
        })
        .catch(() => {
        res.status(500).json({ message: 'error' });
    });
});



module.exports = router