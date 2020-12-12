require('dotenv').config()

const express = require('express')

const server = express()
const project = require('./projects/project-router')

const action = require('./actions/action-router')

const port = process.env.PORT || 5000

server.use(express.json())

server.use('/projects', project)
server.use('/actions', action)



server.listen(port,() => {
    console.log(`server running on ${port}`)
})