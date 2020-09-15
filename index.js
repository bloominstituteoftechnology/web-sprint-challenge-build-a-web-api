const server = require('./server.js');

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`\n*Server is running on http://localhost:${port}`)
})

