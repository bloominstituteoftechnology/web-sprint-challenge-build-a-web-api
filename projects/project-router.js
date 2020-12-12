const express = require('express')

const project = require('../data/helpers/projectModel')

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

module.exports = router