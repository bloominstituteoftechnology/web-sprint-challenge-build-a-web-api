// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model.js');

const router = express.Router();


router.get('/' ,async (req, res) => {
//sends an array of actions (or an empty array) as the body of the response.
    
    try {
        const action = await Actions.get(req.id);
       res.status(200).json(action)
    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.get('/:id' ,async(req, res) => {
    // sends an action with the given id as the body of the response.
    try {
        const action = await Actions.get(req.id);

        if(!action) {
            res.status(404).json({message: "the user was not found"})
        } else {
            res.status(200).json({action})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})
router.post('/' ,async(req, res) => {
    //sends the newly created action as the body of the response.
    try {
        const action = await Actions.insert(req.action);
        if(!action) {
            res.status(404).json({message: "was not able to create"})
        } else {
            res.status(201).json({action});
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.put('/:id' ,async(req, res) => {
    //sends the updated action as the body of the response.
    
    try {
        const action = await  Actions.update(req.id, req.changes)
        if(!action){
            res.status(404).json({message: "was not able to update"})
        } else {
            res.status(200).json({action})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

router.delete('/:id' ,async(req, res) => {
    //sends no response body
    try {
        const action = await Actions.remove(req.id);
        if(action > 0) {
            res.status(200).json({message: "removed"})
        } else {
            res.status(404).json({message: "not found"})
        }

    } catch (err){
        res.status(500).json({error: "there was an error"})
    }
})

module.exports = router;