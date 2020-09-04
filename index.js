require('dotenv').config(); 

const server = require('./server.js');


const PORT = process.env.PORT || 4000;



server.listen(PORT, () => {
  console.log(`\n* Server Running on http://localhost:${PORT} *\n`);
});
