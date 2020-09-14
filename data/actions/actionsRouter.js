const { json } = require("express");
const express = require("express");
const actionModel = require('../data/helpers/actionModel');

const router = express.Router();

//Create 
router.post("/", (req, res) => {
    const showInfo = req.body // where the insertion goes in -  as raw json
    actionModel
        .insert(showInfo)
        .then(() => {
            res.status(201).json({ message: "your show was created!" })
        })
})

//Read
router.get('/', (req, res) => {
    actionModel
        .get(req.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving shows" })
        })
})



//Update 
router.put("/:id", (req, res) => {
    const showInfo = req.body;
    const { id } = req.params
    actionModel
        .update(id, showInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: "The show has been updated!" })
            } else {
                res.status(404).json({ message: "There is nothing to update" })
            }
        })
        .catch(error => {
            res.status(500).json(error, "there was an error updating the show")
        })

})
//Delete 

router.delete("/:id", (req, res) => {
    actionModel
        .remove(req.params.id)
        .then(e => {
            if (e > 0) {
                res.status(200).json({ message: "The show has been deleted" })
            } else {
                res.status(404).json({ message: "Show cannot be found" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting the show" })
        })
})





module.exports = router;