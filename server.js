const express = require('express');
// const morgan = require('morgan');
// const { token } = require('morgan');

const projectRouter = require('./data/projects/projectRouter')
const actionsRouter = require('./data/actions/actionsRouter')

// const helmet = require('helmet');


const server = express();


// //custom middleware
// server.use(morgan('dev')) // Morgan returns a peice of middleware to apply to every path and method
// server.use(methodLogger)


// morgan(function (tokens, req, res) {
//     return [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         token.status(req, res),
//         tokens.res(req, res, "content-length"), '_',
//         tokens['response-time'](req, res), 'ms'
//     ].join('')
// })

// function methodLogger(req, res, next) {
//     console.log(`${req.method} request`)
//     next()
// }
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

// server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({ message: "The server is online!" });
});


module.exports = server;