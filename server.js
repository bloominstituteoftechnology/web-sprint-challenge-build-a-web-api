const express = require('express');
const morgan = require('morgan');
const { tokens } = require('morgan');

//Express is a web app framework - it sits on top of Node web server module
//It is essetially React - for backend
//Adds extra functionality
//Routing
//Middleware support
//A simple API
const showsRouter = require('./data/showsRouter')
const showsRouter = require('./data/characters/characterRouter')

const helmet = require('helmet');

//Helmet = middleware
//Can change the request or response objects - but doesn't have to
//Helmet adds headers for security to your request
const server = express();


//custom middleware
server.use(morgan('dev')) // Morgan returns a peice of middleware to apply to every path and method
server.use(methodLogger)


morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        token.status(req, res),
        tokens.res(req, res, "content-length"), '_',
        tokens['repsponse-time'](req, res), 'ms'
    ].join('')
})

function methodLogger(req, res, next) {
    console.log(`${req.method} request`)
    // get get put post or whatever methed is used
    // res.send('requested yay!')
    next()
}


server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({ message: "The server is online!" });
});

server.use("/api/shows", showsRouter);
server.use("/api/character", characterRouter);

module.exports = server;