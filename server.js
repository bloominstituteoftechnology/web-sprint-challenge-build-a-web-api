const express = require("express");
const helmet = require("helmet");
const server = express();

const actionRouter = require("./actionsRouter/actions-router");
const projectRouter = require("./projectsRouter/projects-router");

//Middleware here
server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ message: "The server is online!" });
});
// Routers here
server.use("/api/actions", actionRouter);
server.use("/api/characters", projectRouter);

//export to index.js where it will listen for port
module.exports = server;
