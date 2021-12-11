// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const router = express.Router()


// [ ] `[GET] /api/projects`
// - Returns an array of projects as the body of the response.
// - If there are no projects it responds with an empty array.
router.get('/' ,(req, res) => {
    
Project.get()
.then(projects => {
    res.status(200).json(projects)
})
.catch(err => {
    res.status(404).json({})
})
})

// - [ ] `[GET] /api/projects/:id`
// - Returns a project with the given `id` as the body of the response.
// - If there is no project with the given `id` it responds with a status code 404.
router.get('/:id', (req, res) => {
    const {id} = req.params

    Project.get(id)
    .then(project => {
        if(!project){
            res.status(404).json({message:'no project founded'})
        }else{
            res.status(200).json(project)
        }
    })

})

// - [ ] `[POST] /api/projects`
// - Returns the newly created project as the body of the response.
// - If the request body is missing any of the required fields it responds with a status code 400.
router.post('/',(req, res) => {
    try{
        const {name, description, completed} = req.body

        if(!name || !description){
            res.status(400).json({message:'no name or description'})
        }else{
            Project.insert({name, description, completed})
            .then(project => {
                res.status(201).json(project)
            })
        }
    }catch(err){
        res.status(500).json({message:'error'})
    }
})

// - [ ] `[PUT] /api/projects/:id`
// - Returns the updated project as the body of the response.
// - If there is no project with the given `id` it responds with a status code 404.
// - If the request body is missing any of the required fields it responds with a status code 400.
router.put('/:id',async(req, res) => {

        Project.get(req.params.id)
     .then(id => {
         if(!id){
             res.status(404).json({
                 message:'no id'
                })
         }else{
             return Project.update(req.params.id, req.body)
         }
     })  
     .then(data => {
         if(data){
            return Project.get(req.params.id)
         }
     })
     .then(post => {
         if(post){
             res.status(400).json(post)
         }
     })
     .catch(err => {
        const {name, description, completed} = req.body
   if(!name || !!description || !completed){
       res.status(400).json({message:'no info'})
   }

     })
    }
)
// })

// - [ ] `[DELETE] /api/projects/:id`
// - Returns no response body.
// - If there is no project with the given `id` it responds with a status code 404.
router.delete('/:id', async(req, res) => {
   const possibleProject = await Project.get(req.params.id)

   if(!possibleProject){
       res.status(404).json({message:'the post with the id not found'})
   }else{
       await Project.remove(req.params.id)
       res.json(possibleProject)
   }
})

// - [ ] `[GET] /api/projects/:id/actions`
// - Returns an array of actions (could be empty) belonging to a project with the given `id`.
// - If there is no project with the given `id` it responds with a status code 404.
router.get('/:id/actions', (req, res) => {
    Project.getProjectActions(req.params.id)
    .then(id => {
        if(!id){
            res.status(404).json({message:'no id'})
        }else{
            res.status(200).json(id)
        }
    })
})

module.exports = router