// Write your "actions" router here!
const actions = require('./actions-model.js');
const express = require("express");
const router = express.Router();
const mw = require("./actionsmw.js")

router.get("/", (req, res)=>{
    actions.get()
    .then(actions=>{
        res.status(200).json(actions);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})
router.get("/:id", mw.validateActionID, (req, res)=>{
    res.status(200).json(req.action);
})
router.post("/", mw.validateActionBody, (req,res)=>{
    actions.insert(req.body)
    .then(action=>{
        res.status(201).json(action);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})
router.put("/:id", mw.validateActionID, mw.validateActionBody, (req,res)=>{
    actions.update(req.params.id, req.body)
    .then(action=>{
        res.status(200).json(action);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})
router.delete("/:id", mw.validateActionID, (req,res)=>{
    actions.remove(req.params.id)
    .then(action=>{
        res.status(200).json(action);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error.message);
    })
})

module.exports = router;