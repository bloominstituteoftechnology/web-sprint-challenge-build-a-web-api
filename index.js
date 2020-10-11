const express = require('express')
const logger = require('./server')
const server = express()
const projectRouter = require('./data/projects/projectRouter')
const actionRouter = require('./data/actions/actionRouter')
const port = 5000

server.use(express.json())

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)
server.use(logger)

server.listen(port, () => {
    console.log('server running at http://localhost/5000')
})