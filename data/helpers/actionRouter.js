const express = require("express");
const actions = require("./actionModel.js");
const router = express.Router();

router.get("/", validateId, (req, res) => {
    actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ errorMessage: "Action not found" })
        })
})

router.post("/", (req, res) => {
    actions.insert(req.body)
        .then(() => {
            res.status(201).json({ message: "Action successfully created." })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errormMessage: "Error posting Action." });
        })
})

router.delete("/:id", validateId, (req, res) => {
    actions.remove(req.params.id)
        .then(action => {
            if(action > 0) {
                res.status(200).json({ message: "Action successfully deleted." })
            } else {
                res.status(404).json({  message: "Action not found." })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "Error updating Action." })
        })
})


router.put("/:id", validateId, (req, res) => {
    actions.update(req.body, req.params.id)
        .then(action => {
            if(action) {
                res.status(200).json({ message: "Action successfully updated." })
            } else {
                res.status(404).json({ message: "Action not found." })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "Error updating action." })
        })
})

// custom middleware
function validateId(req, res, next) {
    actions.get(req.params.id)
    .then(action => {
        if(action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: "Invalid Action ID." })
        }
    })
}

module.exports = router;