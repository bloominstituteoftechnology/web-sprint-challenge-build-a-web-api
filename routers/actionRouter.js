const express = require("express");
const projectRouter = require("../routers/projectRouter");
// const actionRouter = require("../actions/actionRouter");

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>OMG, it actually worked this time!</h2>`)
});

// //endpoints
// server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);


module.exports = server;