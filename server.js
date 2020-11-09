  
const express = require('express');
const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use('/api/project', projectRouter);
server.use('/api/action', actionRouter);

server.get('/',(req,res)=>{
    res.send(`<h2>Unit 4: Sprint 1</h2>`)
})

module.exports = server;