// Write your "actions" router here!
const express = require("express");

const Actions = require("../actions/actions-model");

const router = express.Router();




router.get("/", (req,res) => {
Actions.get()
.then((action) => {
    res.status(200).json(action)
})
.catch(error => {
    res.status(500).json({error: 'Cannot get actions'})
})
})
//  - `[GET] /api/actions` sends an array of actions (or an empty array) as the body of the _response_.

router.get('/:id', (req,res) => {
    const {id} = req.params;
    if(id){
    Actions.get(id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot get actions id'})
    })
}else{
    res.status(404).json({error:"ID not found"})
}

});

//[GET] /api/actions/:id` sends an action with the given `id` as the body of the _response_.

router.post('/', (req,res) => {
    const createAction = req.body;
    
    if(!createAction.project_id || !createAction.notes || !createAction.description ) {
        res.status(400).json({error: "Needs a project id, notes, or description"})
        return;
    }else{
    Actions.insert(createAction)
    .then((action) => {
        res.status(201).json(createAction)
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot create action'})
    })
    }
});


//[POST] /api/actions` sends the newly created action as the body of the _response_.

router.put('/:id`', (req,res) => {
    const {id} = req.params;
    const updateActions = req.body;

    if(!id){
        res.status(404).json({error: "ID not found"})
        return;
    }else{
    Actions.update(id,updateActions)
    .then((action)=> {
        res.status(200).json(updateActions)
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot update action'})
        })
    }
})

//[PUT] /api/actions/:id` sends the updated action as the body of the _response_.


router.delete('/:id', (req,res) => {
    const {id} = req.params;
    if(!id){
        res.status(404).json({error: "ID not found"})
        return;
    } else{
    Actions.remove(id)
    .then((action) => {
        res.status(200).json()
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot delete action'})
        })
    }
})

//[DELETE] /api/actions/:id` sends no _response_ body.

module.exports = router;
