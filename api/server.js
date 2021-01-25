const express = require('express');
const actionRouter = require('./actions/actions-router.js')
const cors = require('cors')
const helmet = require('helmet');
// const morgan  = require('morgan');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors())

server.use((req, res, next) => {
    console.log('welcome to my app')
    next()
 
  });
// Complete your server here!
// Do NOT `server.listen()` inside this file!

// server.use(methodLogger)

const actionsRouterPipe = [logger,logger,logger]

server.use('/api/actions',actionsRouterPipe,actionRouter)

// Method Logger
// function methodLogger(req,res,next){
//     console.log(`${req.method} request`)
//     // res.send('yay')
//     next();
//   }

  server.get('/', (req, res) => {
    const nameInsert = (req.name) ? ` ${req.name}` : '';
  
    res.send(`
      <h2>Actions ${nameInsert} </h2>
      <p>Welcome to ${req.headers['actions']} in a project </p>
    `);
  });
  






module.exports = server;
function logger(req, res, next) {
    console.log('in actions router')
    next()
  }