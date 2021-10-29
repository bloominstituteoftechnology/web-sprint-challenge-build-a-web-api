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
        .catch()
})

module.exports = router;