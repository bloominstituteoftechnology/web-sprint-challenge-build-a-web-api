//TODO 1. Project set-up []installed nodemon as a -D dependency, added server script to package.json
//TODO 2. Installed Express
//TODO 3. Set up server.js to run through index.js 
//TODO 4. Set up the port to be dynamic, or default to 3000 
//TODO See the project folder for further steps

//! import server.js
const server = require("./server"); 

const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => {
    console.log(`server is up and running at port:${PORT}`); 
}); 

