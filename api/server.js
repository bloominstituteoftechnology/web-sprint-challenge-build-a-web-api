const express = require('express')
const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")
const helmet = require("helmet")

const server = express()

server.use(helmet())
server.use(express.json())
server.use(projectsRouter)
server.use(actionsRouter)

server.use((err, req, res, next) => {
    res.status(500).json({
        error: "Something went wrong. Please make sure your information is correct and then try again later"
    })
})




// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
