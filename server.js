const express = require('express');
const helmet = require('helmet');
const ExpressRouter = require('./data/expressRouter.js');



const server = express();
server.use(express.json());
server.use(logger);
server.use(helmet());
server.use('/', ExpressRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });
  

  function logger(req, res, next) {


    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(`${req.method} Request 
    Time: ${dateTime} 
    URL: localhost:4005${req.url}`);
    next();
  }



  module.exports = server;