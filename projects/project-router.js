const express = require('express')

const project = require('./projectModel')

const router = express.Router()

router.get('/', ( req,res,next  )=> {
    project.get()
    .then((pro) => {
        if(pro) {
            res.status(200).json(pro)
        } else {
            res.status(404).json({
                message: "Project can not be found"
            })
        }
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.get('/:id', (req,res,next) => {
    project.getByID(req.params.id)
        .then((pro) => {
            if(pro) {
                res.status(200).json(pro)
            } else {
                res.status(404).json({
                    message: "project could not be found"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

router.post('/', (req,res) => {
    if(!req.body.name || !req.body.description) {
        res.status(500).json({
            message: "Name and description needed"
        })
    } 
        project.insert(req.body)
        .then((pro) => {
            res.status(201).json(pro)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "could not post project"
            })
        })
})

router.put('/:id', (req,res, next) => {
    if(!req.body.name) {
        return res.status(400).json({
            message: "missing name"
        })
    }
    project.update(req.params.id, req.body)

        .then((pro) => {
            if(pro) {
                res.status(200).json(pro)
            } else {
                res.status(404).json({
                    message: "project not found"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

router.delete('/:id', (req,res,next) => {
    project.remove(req.params.id)
        .then((count) => {
            if(count > 0 ) {
                res.status(200).json({
                    message: "the project has been removed"
                })
            } else {
                res.status(404).json({
                    message: "The project could not be found"
                })
            }
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/:id/actions', (req,res,next) => {
    project.getProjectActions(req.params.id)
        .then((action) => {
            res.json(action)
        })
        .catch((err) => {
            console.log(err)
           next(err)
        })
})
module.exports = router