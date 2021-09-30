require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 3003;

server.listen(port, () =>{
    console.log(`Listening on ${port}`);
});