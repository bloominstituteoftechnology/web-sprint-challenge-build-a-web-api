const router = require('express').Router()



const Project = require('../data/helpers/projectModel')

const currentTime = new Date().toDateString()


router.get('/test', (req, res) => {
    res.status(202).json({message: 'the server is running at ' + currentTime})
})

router.get('/', (req, res) => {
    Project.get()
    .then(projects => 
        res.status(200).json(projects))
    .catch(error => 
        res.status(500).json({ message: `Can't ${err}`}))
})

router.get('/:id', (req, res) => {
    Project.getById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(`${err}`))
})

router.post('/', (req, res) => {
    Project.insert()
    .then(result => {
        res.status(200).json(result)
      })
    .catch(error => 
        res.status(500).json({ message: `${err}`}))
})

router.put('/:id', (req, res) => {
    Project.update()
    .then(updated => {res.status(200).json(updated)
    })
    .catch(error => 
        res.status(500).json({ message: `${err}`}))
})

router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
    .then(() => res.status(200).json({ message: `post ${req.params.id}  is destroyed`}))
    .catch(err => res.status(500).json(`${err}`))
})

module.exports = router