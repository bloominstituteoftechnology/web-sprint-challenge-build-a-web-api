//TODO 9. Set up an actions router and export it 
//TODO 10. Create middleware! Validate the project id and action required fields 
const express = require("express"); 
const actions = require("../data/helpers/actionModel"); 

//* create router *// 
const router = express.Router(); 

//? What kind of end points are we going to have? Operations: GET PUT POST DELETE ?//

//! GET all actions !//

router.get("/", (req, res) => {
    actions.get()
        .then(actions => {
            res.status(200).json(actions); 
        })
        .catch(err => {
            res.status(404).json({ message: "Actions not found" }); 
        })
}); 

//! PUT update an action for a project !//
//* pass in the validateAction middleware *// 

router.put("/:id", validateAction, (req, res) => {
    const id = req.params.id; 
    const changes = req.body; 
    actions.update(id, changes)
        .then(updated => {
            res.status(201).json({ message: "Action successfully updated!" }); 
        })
        .catch(err => {
            res.status(500).json({ message: "There has been an error updating the action" }); 
        })
}); 

//! POST add a new action to a project 
//* add validateAction middleware to make sure a project id is attached to the action *// 

router.post("/", validateAction, (req, res) => {
    const projectId = req.body.project_id; 
    const description = req.body.description; 
    const notes = req.body.notes; 
    
    actions.insert(req.body)
        .then(action => {
            res.status(201).json(action); 
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error adding this action to the project" }); 
        })
}); 

//! DELETE an action 

router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    actions.remove(id)
        .then(action => {
            res.status(200).json({ message: "Action successfully removed" }); 
        })
        .catch(err => {
            res.status(500).json({ message: "There was a problem removing this action" }); 
        })
})

//* custom middlware - validateAction *// 

function validateAction(req, res, next){
    const body = req.body; 
    const projectId = req.body.project_id; 
    const description = req.body.description; 
    const notes = req.body.notes; 
    if(!body){
        res.status(400).json({ message: "Missing action data" }); 
    } else if(!projectId || !notes || !description){
        res.status(400).json({ message: "A required field is missing for this action" }); 
    } else if(description.length >= 160){
        res.status(403).json({ message: "Please keep actions description to 160 characters or less #twitterlyfe" }); 
    } else {
        next(); 
    }
}; 

//* export router *// 
module.exports = router; 