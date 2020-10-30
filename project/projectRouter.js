const router = require('express').Router()

const Project = require('./projectModel')

router.get('/', (req, res) => {
    Project.get()
    .then(project => res.status(200).json(project))
    .catch((err) => res.status(500).json(`${err}`))
    
})




router.delete('/:id', (req, res) =>{
    Project.remove(req.params.id)
    .then(() => res.status(200).json({ message: `User ${req.params.id} has been banished!`}))
    .catch(err => res.status(500).json(`${err}`))
})

router.post('/', (req, res) => { 
    Project.insert(req.body)
    .then((res) =>{
        res.status(200).json(res)
    })
    .catch(err => res.status(500).json(`failure to post ${err.message}`))
})

router.put('/:id', (req, res) =>{
    Project.update(req.params.id, req.body)
    .then((res)=>{
        res.status(200).json({message: `User ${req.params.id} has updated their post!`})
    })
    .catch(err => res.status(500).json(`failure to update ${err.message}`))
})

// router.getProjectActions('/:project_id', (req, res) => {
//     Project.get(actions)
//     .then(project => res.status(200).json(project))
//     .catch((err) => res.status(500).json(`${err}`))
    
// })


module.exports = router