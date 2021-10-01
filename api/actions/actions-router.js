const express = require('express')
const { validateAction, validateActionId } = require('./actions-middleware')
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

//[GET] api/actions/:id
router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
  });


//[POST] api/actions
router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
    .then(newAction => {
        res.json(newAction)
    })
    .catch(next)
})

//[PUT] api/actions/:id

//[DELETE] api/actions/:id


module.exports = router