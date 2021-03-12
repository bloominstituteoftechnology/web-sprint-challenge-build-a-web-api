const express = require('express')

const Action = require('./actions-model')
const { validateActionsId } = require('../middleware/middleware')

const router = express.Router();

module.exports = router;