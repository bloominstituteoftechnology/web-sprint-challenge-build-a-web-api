const express =  require('express');

const projects = require('./projects-model');

const router = express.Router();
router.get("/projects", async (req, res) => {
    const getProjects = await projects.get();
    res.json(getProjects);
})
