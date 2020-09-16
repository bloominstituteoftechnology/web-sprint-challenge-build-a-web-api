const express = require("express");
const actionModel = require('../helpers/actionModel');

const router = express.Router();

//Create  - POST
router.post("/", (req, res) => {
    const actionInfo = req.body // where the insertion goes in -  as raw json
    actionModel
        .insert(actionInfo)
        .then(() => {
            res.status(201).json({ message: "your action was created!" })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error posting actions" })
        })
})

//Read - GET > Works!
router.get('/', (req, res) => {
    actionModel
        .get(req.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving actions" })
        })
})



//Update - PUT
router.put("/:id", (req, res) => {
    const actionInfo = req.body;
    const { id } = req.params
    actionModel
        .update(id, actionInfo)
        .then(action => {
            if (action) {
                res.status(200).json({ message: "The action has been updated!" })
            } else {
                res.status(404).json({ message: "There is nothing to update" })
            }
        })
        .catch(error => {
            res.status(500).json(error, "there was an error updating the action")
        })

})


//Delete - DEL > Works!

router.delete("/:id", (req, res) => {
    actionModel
        .remove(req.params.id)
        .then(e => {
            if (e > 0) {
                res.status(200).json({ message: "The action has been deleted" })
            } else {
                res.status(404).json({ message: "action cannot be found" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting the action" })
        })
})





module.exports = router;