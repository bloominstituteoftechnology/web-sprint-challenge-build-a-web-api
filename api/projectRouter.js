const express = require('express');
const pm = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/' , async (req, res)=>{

    res.status(200).json({message: `${req.method}`})
});

//GET project by id

router.get('/:id' , async (req, res)=>{
    const project = await pm.get(req.params.id)
    if (project) {
        res.status(200).json({proj: project})
    }else{
        res.status(400).json({err: 'no such id'})
    }
});

//POST project
router.post('/', (req,res)=>{
    res.status(200).json({message: `${req.method}`})
});



router.put('/', (req,res)=>{
    res.status(200).json({message: `${req.method}`})
});

router.delete('/', (req, res)=>{
    res.status(200).json({message: `${req.method}`})
});


//middlewares 


module.exports = router;