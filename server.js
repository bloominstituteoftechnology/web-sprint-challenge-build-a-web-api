const express = require('express');
const server = express();
const projectRouter = require('./routers/projectRouter.js')
const actionRouter = require('./routers/actionRouter.js')

server.use(express.json());
server.use('/api/projects/', projectRouter)
server.use('/api/actions/', actionRouter)


server.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to Sam G's Web API Sprint!</h1>
    <h2>Please use postman/insomnia to test.</h2>
    `)
})



module.exports = server;