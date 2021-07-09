// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const {
    validateActionId,
    validateAction
} = require('./actions-middlware')

const router = express.Router()

module.exports = router