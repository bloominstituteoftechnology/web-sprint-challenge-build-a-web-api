const express = require('express');
const projectRouter = require('./routers/projectRouter');
// const actionsRouter = require('./routers/actionRouter');

const server = express();
server.use(express.json());

server.use('/api/projects', projectRouter);
// server.use('/api/actions/', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Yeah boi, let's code<h1>`)
})

module.exports = server;