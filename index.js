const express = require("express");
const app = express();

app.use(express.json());

//routing
const projectRoutes = require("./projects/projectRoutes");
const actionRoutes = require("./actions/actionRoutes");

app.use("/projects", projectRoutes);
app.use("/actions", actionRoutes);

app.listen(5000, ()=> console.log("server running"));