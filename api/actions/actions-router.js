const express = require("express")
const { userParams } = require("../../data/dbConfig")
const actions = require("./actions-model")

const router = express.Router()

router.get("/actions", (req, res) => {
    userParams.find(req.query)
        /then((actions) => {
            res.status(200).json(actions)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the actions",
            })
        })
})

router.get('/actions/:id', (req, res) => {
  actions.findById(req.params.id)
    .then((actions) => {
        if (actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({
                message: "Action was not found"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving the actions"
        })
    })
})

router.post('/actions',  (req, res) => {
  actions.add(req.body)
        .then((actions) => {
            res.status(201).json(actions)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding the actions"
            })
        })
})

router.post('/actions/:id',  (req, res) => {
  res.update(req.params.id, req.body)
    .then((actions) => {
        if (actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({
                message: "The actions could not be found"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error updating the actions"
        })
    })
})

router.put('/actions/:id', (req, res) => {
  actions.update(req.params.id, req.body)
    .then((actions) => {
        if (actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({
                message: "The action could not be found"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error updating the action"
        })
    })
})


app.delete('/actions/:id', (req, res) => {
  actions.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({
                message: "The action has been nuked",
            })
        } else {
            res.status(404).json({
                message: "The action could not be found",
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error removing the action",
        })
    })
})

