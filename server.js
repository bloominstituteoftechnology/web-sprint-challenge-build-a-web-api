const express = require("express")
const server = express();

const helmet = require("helmet");


server.use(express.json());
server.use(helmet())

const projectsRouter = require("./data/projects.js/projectsRouter")
const actionsRouter = require("./data/actions.js/actionsRouter")

server.get("/", (req, res)=>{
    res.json({message:"Welcome to Sprint Challenge"})
})


server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);
module.exports = server;