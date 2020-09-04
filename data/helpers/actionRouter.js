const express = require("express");
const data = require("./actionModel.js");
const router = express.Router();


router.get("/:id", idVal, async (req,res)=>{
    const {id} = req.params;
    const response = await data.get(id);
    res.status(200).json(response);
});

router.post("/:id",idVal, async (req,res)=>{
    const {id} = req.params;
    const {description, notes} = req.body;
    const insertion = await data.insert({project_id: id, description, notes});
    res.status(201).json(insertion);
});

router.delete("/:id", async (req,res)=>{
    const {id} = req.params;
    const removing = await data.remove(id);
   if (removing){
    res.status(200).json(removing);
   } else {
       res.status(404).json({error: "wrong id "})
   }
});

router.put("/:id", async (req, res)=>{
    const {id} = req.params;
    const {description, notes, project_id} = req.body;
    const processChange = await data.update(id,{project_id, description, notes})
    res.status(201).json(processChange);
})
// VALIDATION MIDDLEWARE



async function idVal (req,res,next){
    const {id} = req.params;
    const idValidator = await data.get(id);
    switch(idValidator===null){
        case true: 
        res.status(404).json({error: "this user has no actions or user id is wrong"});
        default:
        next();
    };
}

module.exports = router;
