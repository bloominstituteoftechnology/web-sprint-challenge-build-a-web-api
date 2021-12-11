// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Action = require('./actions-model')

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get('/',(req, res) => {
    
    Action.get()
    .then(actions => {
       if(!actions){
           res.status(404).json({})
       }else{
           res.status(200).json(actions)
       }
    })
})

// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
    router.get('/:id',(req, res) => {
        const {id} = req.params
        Action.get(id)
        .then(actions => {
           if(!actions){
               res.status(404).json({})
           }else{
               res.status(200).json(actions)
           }
        })
    
    })

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
    router.post('/', (req, res) => {
        const {description, notes, project_id} = req.body

        if(!description || !notes || !project_id){
            res.status(400).json({message:'error'})
        }else{
        Action.insert({description, notes, project_id})
        .then(post => {
            res.status(201).json(post)
        })
    }
    })

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.put('/:id', async(req, res) => {
    Action.get(req.params.id)
    .then(id => {
        if(!id){
            res.status(404).json({message:'no id'})
        }else{
            return Action.update(req.params.id, req.body)
        }
    })
    .then(data => {
        if(data){
            return Action.get(req.params.id)
        }
    })
    .then(post => {
        if(post){
            res.status(200).json(post)
        }
    })
    .catch(err => {
        const {description, notes, project_id} = req.body
        if(!description || !notes || !project_id){
            res.status(400).json({message:'no info'})
        }
    })
})
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.
router.delete('/:id', async(req, res) => {
    const possible = await Action.get(req.params.id)

    if(!possible){
        res.status(404).json({message:'the post not found'})
    }else{
        await Action.remove(req.params.id)
        res.json(possible)
    }
})

module.exports = router