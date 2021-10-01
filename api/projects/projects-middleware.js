// add middlewares here related to projects

//const express = require('express')
const Projects = require('./projects-model')

const projectLogger = (req, res, next) => {
    const method = req.method 
    const timestamp = new Date().toLocaleDateString()
    const URL = req.originalUrl
    console.log(`method: ${method}, timestamp: ${timestamp} URL: ${URL}`)
    next()
}

const validateProjectId = async (req,res,next) => {
    const {id} = req.params
    // or const id = req.params.id
    try {
        const project = await Projects.get(id)
        if (!project) {
            res.status(404).json({
                message: `project ${id} not found`,
              })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        next(err)
    }

    console.log('validateProjectID middleware')
}

const validateProject =  (req,res,next) => {
    const {name, description, completed} = req.body
    try {
        if (!name || !description || !completed ||
            !name.trim() || !description.trim() ) {
                res.status(400).json({
                    message: "missing required name, description or completion (enter 1 or 0) status field"
                })
        } else {
        next()
        }
    } catch(err){
        next(err)
    }
}


module.exports = {
    projectLogger,
    validateProjectId,
    validateProject,
}