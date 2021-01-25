const express = require('express');
const pm = require('../data/helpers/projectModel');
const am = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/' , async (req, res)=>{

    res.status(200).json({message: `${req.method}`})
});



router.get('/:id' , async (req, res)=>{
    const project = await pm.get(req.params.id)
    if (project) {
        res.status(200).json({proj: project})
    }else{
        res.status(400).json({err: 'no such id'})
    }
});

//GET array of actions for project

router.get('/:id/actions', validateProjectID(), (req, res, next)=>{
    const acts = req.proj.actions;
    if(acts){
        res.status(200).json({acts: acts})
    }else{
        res.status(401).json({err: `$ERR: Could not process your request.`})
    }
} )

//GET actions

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
function validateProjectID(){
    return (req, res, next) =>{
        pm.get(req.params.id)
        .then( proj =>{
            if (proj){
                req.proj = proj
                console.log(`Project ${req.proj.id} was validated.`)
                next();
            }else{
                res.status(400).json({message: `$ERR: No project with id ${req.params.id} found.`})
            }
        }).catch(next);
    }
}
module.exports = router;