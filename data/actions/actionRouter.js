const express = require('express')

const actionDb = require('../actions/actionModel')

const router = express.Router()

router.use(express.json())


router.get('/',  (req, res) => {
    actionDb.get(req.id)

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

router.post('/:id',  (req, res) => {
    actionDb
    .get(req.params.id)
    .then(() => {
        if (!req.body.project_id || !req.body.description || req.body.completed) {
            res.status(400).json({
                message: "Please provide all information",
            })
        } else {
            actionDb
                .insert(req.body)
                .then((action) => {
                    res.status(201).json(action)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        message: "Error adding the action",
                    })
                })
        }
    })
} )

router.get('/:id', validateActionID, (req,res) => {
    const id = req.params.id
    actionDb.get(id)

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

router.put('/:id', (req, res) => {
    actionDb
    .get(req.params.id)
    .then(() => {
        if (!req.body.project_id || !req.body.description || req.body.completed) {
            res.status(400).json({
                message: "Please provide required info for updated actions",
            })
        } else {
            actionDb
                .update(req.params.id, req.body)
                .then(() => {
                    res.status(200).json(req.body)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        message: "The action info could not be updated",
                    })
                })
        }
    })
})

router.delete('/:id', validateActionID, (req, res) => {
    const id = req.params.id
    actionDb.remove(id)
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

function validateActionID(req, res, next) {
    const proId = req.params.id
    actionDb.get(proId)

    .then((pro) => {
        if(pro) {
            req.pro = pro
            next()
        } else {
            res.status(400).json({messege: "invalid"})
        }
    })
}

module.exports = router;
