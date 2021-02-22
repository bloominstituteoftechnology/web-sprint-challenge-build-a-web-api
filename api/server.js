const express = require('express');
const helmet = require("helmet")
const cors = require("cors")
const { logger } = require("./middleware/middleware")
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(logger)
server.use(helmet())
server.use(cors())

server.use(actionsRouter)
server.use(projectsRouter)

server.get(( err, req, res) => {
    res.json({ message: "Hello World" })
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})

module.exports = server;
