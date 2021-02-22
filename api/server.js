const express = require('express')
const { logger } = require("./middleware/middleware")
const helmet = require("helmet")
const cors = require("cors")
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

const server = express()

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(logger())
server.use(helmet())
server.use(cors())


server.use(actionsRouter)
server.use(projectsRouter)

server.get("/", (req, res) => {
    res.json({ message: "Hello World" })
})

module.exports = server;
