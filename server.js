const express = require('express')
const morgan = require('morgan')

const routes = require('./resources/routes')
const validadeError = require('./middlewares/error')
const app = express()

//Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/', routes)

// Server Error status code 500
app.use(validadeError)

module.exports = app
