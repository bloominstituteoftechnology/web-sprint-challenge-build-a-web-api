const express = require('express');
const router = express.Router();
const Action = require('./data/helpers/actionModel');

//GET ACTIONS

router.get('/:id', (req,res)=>{
    Action
        .get(req.params.id)
        .then(actions=>{
            if(actions){
            res.status(200).json(actions);
        }else{
            res.status(404).json({
                message: 'Action not found with that id'
            })
        }
        })
        .catch(error=>{
            console.log(error, 'get all actions catch error');
            res.statusCode(500).json({
                message:'error with getting actions'
            })
        })
})

//POST ACTIONS

router.post('/', (req,res)=>{
    Action
        .insert(req.body)
        .then(action=>{
            res.status(200).json(action);
        })
        .catch(error=>{
            console.log(error,'error with action post request');
            res.status(500).json({
                message: 'error with posting to db'
            })
        })
})


//PUT ACTIONS

router.put('/:id',(req,res)=>{
    Action
        .update(req.params.id, req.body)
        .then(action=>{
            if(action){
                res.status(200).json(action);
            }else{
                res.status(400).json({
                    message: 'Action does not exist'
                })
            }
        })
        .catch(error=>{
            console.log(error,"put request action error");
            res.status(500).json({
                message:"error with db"
            })
        })
})


//DELETE ACTIONS


router.delete('/:id',(req,res)=>{
    const id = req.params.id
    Action
        .remove(id)
        .then(action=>{
            res.status(200).json({
                message: 'action deleted'
            })
        })
        .catch(error=>{
            console.log(error,"error with delete action request");
            res.status(500).json({
                message:"error deleting from db"
            })
        })
})


module.exports= router;