const express = require('express')
const router = express.Router()

// Controller

const ProjectController = require('./project.controller')

router.route('/').get(ProjectController.getProjects)

module.exports = router
