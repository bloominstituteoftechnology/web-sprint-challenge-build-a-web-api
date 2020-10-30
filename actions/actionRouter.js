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
        res.status(500).json({message: 'Cannot get actions' }))
})



router.post('/', (req, res) => {
    const newAction = { user_id: req.params.id, ...req.body}
    Action.insert(newPost)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
    //   console.log(err)
      res.status(500).json({message: "can't crete post"})
    })
})


router.put('/:id', (req, res) => {
    Action.update()
        .then()
        .catch(error => 
            res.status(500).json({message: 'error'}))
})


router.delete('/:id', (req, res) => {
    Action.remove(req.params.id)
    .then(() => res.status(200).json({ message: `post ${req.params.id}  is destroyed`}))
    .catch(err => res.status(500).json(`${err}`))
})

module.exports = router 