const express = require("express")
const actionModel = require("../helpers/actionModel")
const router = express.Router();

router.post("/", (req, res)=>{
    const actionInfo = req.body;
    actionModel
    .insert(actionInfo)
    .then(()=>{
        res.status(200).json({message:"Your action was created"})
    })
})

router.get("/", (req, res)=>{
    actionModel
    .get(req.id)
    .then(e =>{
        res.status(200).json(e)
    })
    .catch(err =>{
        res.status(500).json({message: "Error retrieving action"})
    })
})

router.put("/:id", (req,res)=>{
    const actionInfo = req.body;
    const {id} = req.params;
    actionModel
    .update(id, actionModel)
    .then(e =>{
        if(e){
            res.status(200).json({message:"Action was updated"})
        }else{
            res.status(404).json({message: "Action could not be updated"})
        }
     })
     .catch(err =>{
        res.status(500).json({message: "There was an error updating actions"})
    })
})

router.delete("/:id", (req, res)=>{
    actionModel
    .remove(req.params.id)
    .then(e=>{
        if(e){
            res.status(200).json({message: "Action was deleted"})
        }else{
            res.status(500).json({message:"Error retrieving action"})
        }
    })
})

module.exports = router;