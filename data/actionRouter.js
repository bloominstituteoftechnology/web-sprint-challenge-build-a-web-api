const express = require('express');

const actions = require('./helpers/actionModel');

const router = express.Router();

router.get("/actions", (req, res) => {
    actions
        .get()
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "unable to get actions",
            })
        })
})


router.get("/actions/:id", (req, res) => {
    actions
        .get(req.params.id) 
        .then((action) => {
            if (req.params.id) {
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "no action with that id",
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The action information could not be found"
            })
        })
})


router.delete("/actions/:id", (req, res) => {
    actions
        .remove(req.params.id)
        .then((action) => {
            if (!req.params.id) {
                res.status(404).json({
                    message: "the action with that id does not exist",
                })
            } else (
                res.status(200).json({
                    message: "action was deleted",
                })
            )
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "the action could not be removed",
            })
        })
})


router.put("/actions/:id", (req, res) => {
    actions
        .get(req.params.id)
        .then((action) => {
            if (!req.body.project_id || !req.body.description || req.body.completed) {
                res.status(400).json({
                    message: "Please provide a required info for updated actions",
                })
            } else {
                actions
                    .update(req.params.id, req.body)
                    .then((action) => {
                        res.status(200).json(req.body)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            message: "The action info could not be updated",
                        })
                    })
            }
        })
})

router.post("/actions/:id", (req, res) => {
    actions
        .get(req.params.id)
        .then((action) => {
            if (!req.body.project_id || !req.body.description || req.body.completed) {
                res.status(400).json({
                    message: "Please provide all information",
                })
            } else {
                actions
                    .insert(req.body)
                    .then((action) => {
                        res.status(201).json(action)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            message: "Error adding the action",
                        })
                    })
            }
        })
})

module.exports = router