const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const server = require('./api/server');

server.use(cors());
server.use(express.static(path.join(__dirname, 'client/build'))); // static assets

console.log(process.env.USER); // env USER=michael
console.log(process.env.SHELL); // env SHELL=/bin/zhs

if (process.env.NODE_ENV === 'production') {
	console.log('this means this code is deployed');
}

const PORT = process.env.PORT || 6000;

console.log('port is -> ', PORT);

server.listen(PORT, () => {
	console.log(`\n*** Server Running on http://localhost:${PORT}***\n`);
});
