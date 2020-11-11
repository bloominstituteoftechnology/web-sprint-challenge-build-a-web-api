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

//testing the PORT.Env
server.get("/", (req, res) => {
  const modt = process.env.MOTD;
  res.status(200).json({ message: "The server is online!", motd: motd });
});

//  ACTION AND PROJECT Routers here
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

//export to index.js where it will listen for port
module.exports = server;
