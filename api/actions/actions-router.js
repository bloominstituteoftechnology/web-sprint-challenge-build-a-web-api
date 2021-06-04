// Write your "actions" router here!
const express = require('express');
 
const Actions = require('./actions-model');

const router = express.Router();




//  `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get('/', async (req,res) =>{
    try{
        const actions = await Actions.get()
        res.status(200).json(actions);
    }//end of try
    catch(err){
        res.status(500).json({messsage: err});

    }//end of catch
})


//  `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
router.get('/:id', async (req, res)=>{
    const id = req.params.id;
   
    try{
        const action = await Actions.get(id)
        if (!action){
            res.status(404).json({message:`the action with id ${id} does not exist`})
        }else{
            res.status(200).json(action)
        }
    }//end of try
    catch(err){
        res.status(500).json({message:err})
    }//end of catch
})


//  `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
router.post('/actions', async (req, res) =>{
    const body = req.body

    if(!body.project_id || !body.description || !body.notes){
        res.status(400).json({message: 'fill in required fields'})
    }else{
        try{
            const action = await Actions.insert(body);
            res.status(201).json(action);
        }//end of try
        catch(err){
            res.status(500).json({message:err})
        }//end of catch
    }
})


//  `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put('/:id', async (req, res) =>{
    const id = req.params.id;
    const body = req.body;

    if(!body.description && !body.notes){
        res.status(400).json({message: 'fill in all required fields'});
    }else{
        try{
            const action = await Actions.update(id, body);
            if(!action){
                res.status(404).json({message: `action with an id of ${id} does not exsist`})
            }else{
                res.status(200).json(action)
            }
        }//end of try
        catch(err){
            res.status(500).json({message: err});
        }//end of catch
    }
})


//  `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.
router.delete('/:id', async (req,res)=>{
    const id = req.params.id;

    try{
        const action = await Actions.remove(id);
        if(!action){
            res.status(404).json({message: "the action with that id does not exsist"})
        }else{
            res.status(200).json(action);
        }
    }//end of try
    catch(err){
        res.status(500).json({message: err});
    }//end of catch

})

// router.use((err,req,res,next)=>{
//     res.status(err.status || 500).json({
//         customMessage : 'something bad happened...',
//         message : err.message,
//         stack: err.stack,
//     })
// })

module.exports = router;