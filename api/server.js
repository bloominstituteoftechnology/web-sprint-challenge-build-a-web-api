const express = require('express');
const cors = require("cors");
const server = express();
server.use(cors())
server.use(express.json());
const projectRouter = require("./projects/projects-router.js");
const actionRouter = require("./actions/actions-router.js");
// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use("/api/projects/", projectRouter);
server.use("/api/actions/", actionRouter);
module.exports = server;
