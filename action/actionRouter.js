const router = require('express').Router()

const Action = require('./actionModel')

router.get('/', (req, res) => {
    Action.get()
    .then(users => res.status(200).json(users))
    .catch((err) => res.status(500).json(`${err}`))
    
})




router.delete('/:id', (req, res) =>{
    Action.remove(req.params.id)
    .then(() => res.status(200).json({ message: `User ${req.params.id} has been banished!`}))
    .catch(err => res.status(500).json(`${err}`))
})

router.post('/', (req, res) => { 
    Action.insert(req.body)
    .then((res) =>{
        res.status(200).json(res)
    })
    .catch(err => res.status(500).json(`failure on backend ${err.message}`))
})

router.put('/:id', (req, res) =>{
    Action.update(req.params.id, req.body)
    .then((res)=>{
        res.status(200).json({message: `User ${req.params.id} has updated their post!`})
    })
    .catch(err => res.status(500).json(`failure on backend ${err.message}`))
})


module.exports = router