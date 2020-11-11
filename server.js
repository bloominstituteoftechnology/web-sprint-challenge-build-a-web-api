const express = require("express");
const helmet = require("helmet");
const logger = require("./middleware/loggers");
const server = express();

const actionRouter = require("./actionsRouter/actions-router");
const projectRouter = require("./projectsRouter/projects-router");

//Middleware here
//test heroku comment
server.use(express.json());
server.use(helmet());
// server.use(logger("long"));
//Can apply both short and long values to get a shorter or longer logger
server.use(logger("short"));

server.get("/", (req, res) => {
  res.status(200).json({ message: "The server is online!" });
});

//  ACTION AND PROJECT Routers here
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

//export to index.js where it will listen for port
module.exports = server;
