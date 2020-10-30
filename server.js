const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const projectRouter = require('./project/projectRouter')
const actionRouter = require('./action/actionRouter') 

const server = express()
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
    res.send('endpoint legit')
})

module.exports = server