// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            if (projects) {
                res.status(200).json(projects)
            } else {
                res.status(200).json([])
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The projects could not be received"
            })
        })
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "Could not find a project with the given id"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The projects could not be received"
            })
        })    
})

module.exports = router;