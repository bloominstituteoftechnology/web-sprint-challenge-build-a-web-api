const express = require('express')
const dbActions = require('../data/helpers/actionModel.js')
const router = express.Router();


router.get('/' , (req, res) => {
    dbActions.get()
        .then(allActions => {
            res.status(200).json(allActions)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was router error retrieving the actions data.'
            })
        })
})

router.get('/:actionID' , (req, res) => {
    dbActions.get(req.params.actionID)
        .then(allActions => {
            res.status(200).json(allActions)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was router error retrieving that action data.'
            })
        })
})

router.post('/:projectID' , (req, res) => {
    dbActions.insert({...req.body, project_id: req.params.projectID})
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was router error adding that action.'
            })
        })
})

router.put('/:actionID' , (req, res) => {
    dbActions.update(req.params.actionID, req.body)
        .then(updatedAction => {
            res.status(201).json(updatedAction)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was router error updating that action.'
            })
        })
})

router.delete('/:actionID' , (req, res) => {
    dbActions.remove(req.params.actionID)
        .then(deletedAction => {
            res.status(200).json(deletedAction)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was router error deleting that action.'
            })
        })
})


module.exports = router;
