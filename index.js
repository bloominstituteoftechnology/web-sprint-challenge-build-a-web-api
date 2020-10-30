require("dotenv").config();

const server = require("./server");

const PORT = process.env.PORT || 3500;

server.listen(PORT, () => {
  console.log(`Listening on port number: ${PORT}`);
});
