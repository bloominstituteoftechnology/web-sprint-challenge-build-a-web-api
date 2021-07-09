// Write your "projects" router here!

const express = require("express")

const Project = require("./projects-model")

const router = express.Router()

const {vaildationProject ,validateID } = require("./projects-middleware")




router.get("/", (req,res,next) =>{
    Project.get()
    .then(projects => {
        res.status(200).json(projects)
    })
  .catch(next)
})
  
router.get("/:id",validateID,( (req,res, next) => {
    Project.get(req.params.id)
      .then(project => {
            if(!project) {
            res.status(404)
            next()
            }
          else{

    res.status(200).json(req.project)}
     })
    .catch(next)

    }))



     router.post("/",vaildationProject,validateID, (req,res,next)=> {
     Project.insert(req.project)
     .then(project =>{
     res.status(200).json(project)
})
 .catch(next)
})
    

router.put("/:id", vaildationProject, validateID,( (req,res,next) => {
    Project.update(req.params.id, req.body)
    .then(project => {
        if(!project){
            res.status(404)
            next()
        } else{
            res.status(200).json(project)
         }})
   
    .catch(next)
}))

router.delete("./:id", validateID,(req, res, next) => {
Project.remove(req.params.id)
.then(deleted => {

    res.status(200).json(deleted)
})
.catch(next)
})

router.get("/:id/actions", (req,res,next) => {
const {id} = req.params;
    Project.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions) 
    })
    .catch(next)
})

module.exports = router