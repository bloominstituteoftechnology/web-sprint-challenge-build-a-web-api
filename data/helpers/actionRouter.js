const express = require("express");
const actions = require("./actionModel.js");
const router = express.Router();

//get
router.get("/:id", validateId, (req, res) => {
    actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ errorMessage: "Action ID not found" })
        })
})

//post

//delete

//put

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