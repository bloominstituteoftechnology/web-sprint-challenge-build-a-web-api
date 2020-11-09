const express = require("express");

const projectRouter = require("./projectRouter.js");
const actionRouter = require("./actionRouter");

const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is online" });
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
