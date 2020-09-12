const express = require("express");
const actionRouter = require("./data/helpers/actionRouter");
const projectRouter = require("./data/helpers/projectRouter");
const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
});

module.exports = server;