const express = require('express')
const { validateAction } = require('./actions-middleware')
const Action = require('../actions/actions-model')
const Project = require('../projects/projects-model')

const router = express.Router()

//[GET] api/actions
router.get('/', (req, res, next) => {
    Action.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(next)
})


//[POST] api/actions
router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
    .then(newAction => {
        res.json(newAction)
    })
    .catch(next)
})


module.exports = router