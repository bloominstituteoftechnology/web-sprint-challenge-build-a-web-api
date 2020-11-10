require("dotenv").config();

const server = require("./server.js");

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`\n***server i s running on http://localhost:${port}\n`);
});
