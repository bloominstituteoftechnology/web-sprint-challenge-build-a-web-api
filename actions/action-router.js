const express = require('express')

const action = require('./actionModel')

const router = express.Router()

router.get('/',(req,res,next) => {
    action.get()
        .then((act) => {
            res.status(200).json(act)
        } )
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

router.get('/:id', (req,res,next) => {
    action.getById(req.params.id)
    .then((act) => {
        res.status(200).json(act)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.post('/', (req,res,next) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes) {
        return res.status(404).json({
            message: "missing description and notes"
        })
    }

    action.insert(req.body)
        .then((act) => {
            res.status(201).json(act)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

router.put('/:id', (req,res,next) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes) {
        return res.status(404).json({
            message: "missing description and notes"
        })
    }
    action.update(req.params.id, req.body) 
    .then((act) => {
        if(act) {
            res.status(200).json(act)
        } else {
            res.status(404).json({
                message: "action could not be changed"
            })
        }
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.delete('/:id',(req,res,next) => {
    action.remove(req.params.id)
        .then((count) => {
            if(count > 0) {
                res.status(200).json({
                    message: "action has been removed"
                })
            } else {
                res.status(404).json({
                    message: "action could not be removed"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})
module.exports = router