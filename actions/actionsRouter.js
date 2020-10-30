const express = require("express")

const db = require("../data/helpers/actionModel")
const Project = require("../data/helpers/projectModel")

const router = express.Router();

router.post('/', validatePost, (req, res) => {
    const projectId = req.body.project_id
    const description = req.body.description
    const notes = req.body.notes

    db.insert({project_id: projectId, description: description, notes: notes})
    .then(post => {
        res.status(201).json("Created")
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "action could not be created"})
    })
})

router.get("/", (req, res) => {
    db.get()
        .then(actions => {
            res.status(201).json(actions)
        })
})

router.put("/id", validatePost, (req, res) => {
    const changes = req.body
    const {id} = req.params

    db.update(id, changes)
        .then(updated => {
            res.status(200).json({message: "The action has been updated"})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "actions could not be updated"})
        })
})

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then(action => {
            res.status(204).json({message: "Action was successfully deleted"})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Action could not be deleted"})
        })
})

function validatePost(req, res, next){
    const body = req.body
    const note = req.body.notes
    const description = req.body.description
    const projectId = req.body.project_id

    if(!body){
        res.status(400).json({message: "missing data"})
    } else if (!note || !description || !projectId){
        res.status(400).json({message: "required field is missing"})
    } else if (description.length > 128){
        res.status(400).json({message: "description must be 128 characters or less"})
    } else {
        next()
    }
}
module.exports = router; 