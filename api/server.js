const express = require('express');
const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js')

const server = express();


// middleware
server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// default get
server.get('/' ,(req,res) => {
    res.json({message: "Sprint MVP"})
})


module.exports = server;
