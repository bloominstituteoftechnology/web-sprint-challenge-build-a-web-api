const express= require('express');
const Projects = require ('./projects-model.js');
const router = express.Router();
const mw = require('../middleware/middleware.js')




router.get('/api/projects', (req,res) =>{

}) //   Can't wait to see you today :)

router.get('/api/projects/:id', mw.middleware, (req,res) =>{
    res.status(200).json(req.hub)
})

router.post('/api/projects', (req,res) =>{

})

router.delete('/api/projects/:id', mw.middleware, (req,res) =>{

})

router.put('/api/projects/:id', mw.middleware, (req,res) =>{

})

router.get('/api/projects/:id', mw.middlware, (req,res) =>{

})

router.post('/api/projects/:id', (req,res,next) =>{

})

router.use((err,req,res,next) => {
    res.status(500).json({
        message:"something blew up",
        error:err.message
})})
module.exports = router;
