// Write your "actions" router here!
const express=require('express');

const Actions=require("./actions-model")

const {validateActionId,validateActionBody}=require('../middleware/middleware');

const router=express.Router();

router.get('/', (req,res,next)=>{
    Actions.get()
        .then(action=>{
            res.status(200).json(action)
        })
        .catch(next)
})

router.get('/:id',validateActionId, (req,res,next)=>{
    res.status(200).json(req.action)
})

router.post('/',validateActionBody, (req,res,next)=>{
    Actions.insert(req.body)
    .then(action=>{
        res.status(200).json(action)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateActionBody, (req,res,next)=>{
    Actions.update(req.params.id,req.body)
        .then(action=>{
            res.status(200).json(action)
        })
        .catch(next)

})

router.delete('/:id',validateActionId, (req,res,next)=>{
    Actions.remove(req.params.id)
        .then(deleted=>{
            if (deleted===1){
                res.status(200).json({message:`The action with the id of ${req.params.id} was deleted`})
            }
            else{res.status(500).json({message:'There was an error deleting the action'})}
        })
        .catch(next)
})



router.use((error, req, res, next)=>{
    res.status(500).json({ info: 'There was an error in the router',
  message: error.message,
  stack: error.stack})
  })

  module.exports=router