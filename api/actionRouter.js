const express = require('express');
const am = require('../data/helpers/actionModel');
const pm = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/' , async (req, res)=>{
    res.status(200).json({message: `${req.method}`})
});

//GET task by id

router.get('/:id' , async (req, res)=>{
    const project = await am.get(req.params.id)
    if (project) {
        res.status(200).json({act: project})
    }else{
        res.status(400).json({err: 'no such id'})
    }
});


router.put('/', (req,res)=>{
    res.status(200).json({message: `${req.method}`})
});

router.delete('/', (req, res)=>{
    res.status(200).json({message: `${req.method}`})
});

router.post('/:id', validateProjectID(), async (req,res,next)=>{
    const act = req.body;
    act.project_id = req.proj.id
    if (act) {
        await am.insert(act)
        .then( resolve=>{
            res.status(200).json({message: `Your action was posted`, act: act})
        }).catch(next)
    }else{

    }
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