// Write your "actions" router here!
const express= require ("express");
const router= express.Router();
const actions= require("./actions-model")

router.get("/api/actions",((req,res)=>{
    actions.get(req.query.id)
    .then(action=>{res.status(200).json(action)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"Could not retrieve actions."})
    })
}))
router.get("/api/actions/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"The action with this id does not exist"})}
    actions.get(req.params.id)
    .then(action=>{res.status(200).json(action)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.post("/api/actions",((req,res)=>{
    if(!req.body.project_id || !req.body.description || !req.body.notes){res.status(400).json({error:"Must include post body"})}
    actions.insert(req.body)
    .then(action=>{
        res.status(201).json(action)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.put("/api/actions/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"The action with this id does not exist"})}
    if(!req.body.project_id || !req.body.description || !req.body.notes){res.status(400).json({error:"Must include post body"})}
    actions.update(req.params.id, req.body)
    .then(action=>{
        res.status(200).json(action)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.delete("/api/actions/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"The action with this id does not exist"})}
    actions.remove(req.params.id)
    .then(()=>{
        res.status(200).json({message: "The action has been deleted."})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

module.exports = router;
