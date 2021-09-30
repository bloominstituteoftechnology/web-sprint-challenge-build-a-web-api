// Write your "projects" router here!
const express = require('express');
const {
    validateProject,
    validateProjectId
} = require('./projects-middleware')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')

const router = express.Router();





module.exports = router