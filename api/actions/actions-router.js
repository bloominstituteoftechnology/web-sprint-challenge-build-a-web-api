// Write your "actions" router here!
const express = require("express");

const Actions = require("../actions/actions-model")

const router = express.Router();

router.use(express.json());


router.get("/api/actions", (req,res) => {
Actions.get(req.body)
.then((action) => {
    res.status(200).json(action)
})
.catch(error => {
    res.status(500).json({error: 'Cannot get actions'})
})
})
//  - `[GET] /api/actions` sends an array of actions (or an empty array) as the body of the _response_.

router.get('/api/actions/:id', (req,res) => {
    Actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot get actions id'})
    })

});

//[GET] /api/actions/:id` sends an action with the given `id` as the body of the _response_.

router.post('/api/actions', (req,res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot create action'})
    })
});


//[POST] /api/actions` sends the newly created action as the body of the _response_.

router.put('/api/actions/:id`', (req,res) => {
    const actionID = req.params.id;
    const updateActions = req.body;

    Actions.update(actionID,updateActions)
    .then(()=> {
        res.status(200).json({message: 'Post has been updated!'})
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot update action'})
    })
})

//[PUT] /api/actions/:id` sends the updated action as the body of the _response_.


router.delete('/api/actions/:id', (req,res) => {
    const action = req.action;

    Actions.remove(action.id)
    .then(() => {
        res.status(200).json({message: "Action has been deleted"})
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot delete action'})
    })
})

//[DELETE] /api/actions/:id` sends no _response_ body.