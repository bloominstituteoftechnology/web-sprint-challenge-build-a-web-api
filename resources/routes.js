const express = require('express')
const app = express()

// Routes
const welcomeRouter = require('./welcome/welcomeRouter')
const actionsRouter = require('./actions/actionsRoute')
const projectsRouter = require('./project/projectRoute')

app.use('/', welcomeRouter)
app.use('/api/actions', actionsRouter)
app.use('/api/projects', projectsRouter)

module.exports = app
