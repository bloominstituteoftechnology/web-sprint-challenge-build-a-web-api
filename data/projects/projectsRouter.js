const express = require('express')
const projectsModel = require('../helpers/projectModel.js');

const router = express.Router();

router.post('/', (req, res) => {
    const projectInfo = req.body
    projectsModel
    .insert(projectInfo)
    .then(() => {
        res.status(201).json(({message: "Your project was created."}))
    })
    .catch(error => {
        res.status(500).json({error, error: "There was an error creating a new project."})
    })
})

router.get('/', (req, res) => {
    projectsModel.get(req.id)
    .then(e => {
        res.status(200).json(e)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There is an error getting projects."})
    })
})

router.put('/:id', (req, res) => {
    const projectInfo = req.body;
    const {id} = req.params;
    projectsModel
    .update(id, projectInfo)
    .then(e => {
        if(e){
            res.status(200).json({message: "The project has been updated."})
        } else {
            res.status(404).json({message: "The project is not found nor updated."})
        }
    })
    .catch(error => {
        res.status(500).json({erro: 'There was an error updating the projects.'})
    })
})

router.delete('/:id', (req, res) => {
    projectsModel
    .remove(req.params.id)
    .then(e => {
        if(e > 0) {
            res.status(200).json({message: "The project has been deleted."})
        } else {
            res.status(400).json({message: "The project can not be found."})
        }
    }) 
    .catch(error => {
        console.log(error);
        req.status(500).json({message: "There was an error deleting the project."})
    })
})

router.get('/:id/actions', (req, res) => {
    projectsModel
    .getProjectActions(req.params.id)
    .then((e) => {
        res.status(200).json(e)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: "There was error retrieving actions."})
    });
});

module.exports = router