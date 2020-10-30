const router = require('express').Router()

// const Action = require('./actionModel')
const Action = require('../data/helpers/actionModel')



const currentTime = new Date().toDateString()

router.get('/test', (req, res) => {
    res.status(202).json({message: 'the server is running at ' + currentTime})
})


router.get('/', (req, res) => {
    Action.get()
    .then(actions => 
        res.status(200).json(actions))
    .catch(error => 
        res.status(500).json({message: `Cannot get actions ${err}`}))
})


router.post('/', (req, res) => {
    Action.insert()
    .then(updated => {res.status(200).json(updated)
})
    .catch(error => res.status(500).json({message: `${err}`}))
})


router.put('/:id', (req, res) => {
    Action.update()
        .then()
        .catch(error => 
            res.status(500).json({message: `${err}`}))
})


router.delete('/:id', (req, res) => {
    Action.remove()
    .then(() => 
    res.status(200).json({ message: `action is destroyed`}))
    .catch(error => 
        res.status(500).json({message: `${err}
    `}))
})

module.exports = router 