/*
read the README
got no sense of what is REST? just concentrate on learning Express
your file is getting way too big, bring a Router and make it thin
there is no data on that route, just write some code
need this code, but don't know where, perhaps should make some middleware

Pull your server into this file and start it!
*/


//arbitrary change to commit empty

//seed: nodeProj3

require('dotenv').config()
const PORT = process.env.PORT || 5000
const server = require("./api/server")

server.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`)
})
