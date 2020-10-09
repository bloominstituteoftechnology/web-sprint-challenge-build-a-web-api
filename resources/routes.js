const express = require('express')
const app = express()

// Routes
const welcomeRouter = require('./welcome/welcomeRouter')
// const postsRouter = require('./posts/postRouter')
// const usersRouter = require('./users/userRouter')

app.use('/', welcomeRouter)
// app.use('/api/posts', postsRouter)
// app.use('/api/users', usersRouter)

module.exports = app
