const dotenv = require("dotenv").config(); //eslint-disable-line
const server = require("./api/server");

const port = process.env.PORT || 5000;

console.log(process.env.PORT);

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
// trying to solve git issues
