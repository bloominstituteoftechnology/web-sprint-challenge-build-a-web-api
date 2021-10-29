// Write your "actions" router here!
const express = require('express')

const {
    validateAction,
    validateActionId,
} = require('./actions-middlware')

const Actions = require('./actions-model')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }   
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/',(req, res) => {
    const newAction = req.body;
    if (newAction.project_id && newAction.description && newAction.notes) {
        Actions.insert(newAction)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "The action could not be recieved"
                })
            })
        } else {
            res.status(400).json({
                message: "Project id, description, and notes required"
            })
        }
})
module.exports = router;