const express = require('express');
const actions = require("./actions-model")
const router = express.Router();

router.get("/actions", async (req, res) => {
try{
    const getActions = await actions.get()
    res.status(200).json(getActions)
}catch(err){
    next(err)
}
});
router.get("/actions/:id", validateID(), async (req, res) => {
    try{
const getActionById = await actions.get(req.params.id);
res.status(200).json(getActionById)
    }catch(err){
        next(err)
    }
});
router.post("/actions", validatePost(), async (req, res) => {
    try{
        const newAction = await actions.insert({
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes
        })
        res.status(201).json(newAction)
    }catch(err){
        next(err)
    }
});
router.put("/actions/:id",validatePost(), validateID(), async (req, res) => {
    try{
        const updateAction = await actions.update(req.params.id, req.body)
        res.status(200).json(updateAction)
    }catch(err){
        next(err)
    }
});
router.delete("/actions/:id", validateID(), async(req, res) => {
    try{
        const deleteAction = await actions.remove(req.params.id)
        res.status(204).json({
            message: "action was deleted congrats!"
        })
    }catch(err){
        next(err)
    }
})


function validateID(){
    return (req, res, next) => {
        actions.get(req.params.id)
        .then(action => {
            if(action){
                req.action
                next()
            }else{
                res.status(404).json({
                    message: "there is no action with that id in the data base"
                })
            }
        })
        .catch(err => next(err))
    }
}

function validatePost(){
    return (req, res, next) => {
        if(!req.body.description || !req.body.notes || !req.body.project_id){
            res.status(400).json({
                message: "make sure you're sending notes, description and a project id"
            })
        }else if(req.body.description.length <= 128){
            res.status(400).json({
                message: "description should be 128 charcatest or LESS"
            })
        }  
        else{
            next()
        }
    }
}

module.exports = router;
