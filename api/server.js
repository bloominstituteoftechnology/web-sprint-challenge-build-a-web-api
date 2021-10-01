const express = require('express') //require dependencies
const helmet = require('helmet')
const cors = require ('cors')
const projectRouter = require('./projects/projects-router') //require routers
const actionRouter = require('./actions/actions-router') 

const server = express() //start express

server.use(express.json()) //utilize dependencies (modules?)
server.use(helmet())
server.use(cors())
server.use('/api/projects', projectRouter) //utilize routers
server.use('/api/actions', actionRouter)

server.use('*', (req, res) =>{ //404 fallback on *
    res.send(`<h1>Apologies, path not found. Please check for typos and ensure everything
is up and running. This is the fallback response.</h1>`)

})

module.exports = server //export to index

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
