const express = require("express");
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const projectRouter = require("./data/routers/projectsRouter");
const actionRouter = require("./data/routers/actionsRouter");

const port = 5000;

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/aciotns", actionRouter);

server.get("/", (req, res) => {
  res.send("Hello from Express");
});

module.exports = server;
