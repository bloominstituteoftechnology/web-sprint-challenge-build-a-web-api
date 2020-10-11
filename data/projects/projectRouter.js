const express = require('express')
const actionDB = require('../actions/actionModel')
const projectDb = require('./projectModel')
const router = express.Router()

router.use(express.json())

router.get('/',  (req, res) => {
    projectDb.get(req.id)

    .then((pro) => {
        res.status(200).json(pro)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "could not retrive project"
        })
    })
})

router.post('/:id',  validateProject, (req, res) => {
    const projectData = req.body
    if (!projectData.name || !projectData.description) {
        res.status(500).json({ message: "Name and Desc needed" });
    } else {
        projectDb.insert(projectData)
        .then((pro) => {
            res.status(201).json({pro})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "could not post project"
            })
        })
    }
} )

router.get('/:id', validateProjectID, (req,res) => {
    const id = req.params.id
    projectDb.get(id)

    .then((pro) => {
        res.status(200).json(pro)
    })
    .catch((err)=> {
        console.log(err)
        res.status(500).json({
            message: "could not retrive user"
        })
    })
})

router.put('/:id', validateProjectID, validateProject, (req, res) => {
    const id = req.params.id
    const data = req.body

    projectDb.update(id, data)
    .then((pro) => {
        res.status(200).json(pro)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "could not add project"
        })
    })
})

router.delete('/:id', validateProjectID, (req, res) => {
    const id = req.params.id
    projectDb.remove(id)
    .then((pro) => {
        res.status(200).json(pro)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "could"
        })
    })
})

function validateProjectID(req, res, next) {
    const proId = req.params.id
    projectDb.get(proId)

    .then((pro) => {
        if(pro) {
            req.pro = pro
            next()
        } else {
            res.status(400).json({messege: "invalid"})
        }
    })
}

function validateProject(req, res, next) {
    const projectData = req.body
  
    if (!projectData.name || !projectData.description) {
        res.status(500).json({ message: "Name and Desc needed" });
    } else {
      next()
    }
  }

module.exports = router;
