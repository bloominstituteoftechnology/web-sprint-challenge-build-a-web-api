require('dotenv').config()

const express = require('express')

const server = express()

const port = process.env.PORT || 5000

const project = require('./projects/project-router')

server.use('/projects', project)

server.use(express.json())

server.listen(port,() => {
    console.log(`server running on ${port}`)
})