const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const projectsRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");
// const { validateProjectId,
//         validateActionId,
//         validateProject,
//         validateAction } = require('./middleware.js');
const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

server.get('/', (req, res)=> {
    res.send(`This is working!`);
});


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js


module.exports = server;
