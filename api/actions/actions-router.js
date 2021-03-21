const express= require('express');
const Actions = require ('./actions-model.js');
const router = express.Router();
const mw = require('../middleware/middleware.js')

router.get('/api/actions', (req,res) =>{

})

router.get('/api/actions/:id', mw.middleware, (req,res) =>{
    res.status(200).json(req.hub)
})

router.post('/api/actions', (req,res) =>{

})

router.delete('/api/actions/:id', mw.middleware, (req,res) =>{

})

router.put('/api/actions/:id', mw.middleware, (req,res) =>{

})

router.get('/api/actions/:id', mw.middlware, (req,res) =>{

})

router.post('/api/actions/:id', (req,res,next) =>{

})

router.use((err,req,res,next) => {
    res.status(500).json({
        message:"something blew up",
        error:err.message
})})
module.exports = router;
