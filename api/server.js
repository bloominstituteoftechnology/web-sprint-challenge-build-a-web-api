const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

// middlewares
server.use(express.json());

// server error
server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      note: `something went terriblly wrong with the server`, 
      message: err.message,
      stack: err.stack,
    });
  });

// routers
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

// defaults
server.use('/', (req, res) => {
    res.send(`<h2>Look Ma, I built an API!</h2>`);
});

module.exports = server;
