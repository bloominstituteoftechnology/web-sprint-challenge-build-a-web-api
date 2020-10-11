const express = require("express")
const cors = require("cors")

const server = express();

const projectRouter = require("./projects/projectRouter")
const actionRouter = require("./actions/actionsRouter")

server.use(express.json())
server.use(cors())

server.use("/api/projects", projectRouter)
server.use("/api/actions", actionRouter)

server.get("/", (req, res) => {
    res.send(`<h2>Sprint test</h2>`)
})

module.exports = server;