// Write your "actions" router here!


const Action = require("./actions-model");
const express = require("express")
const {vaildationAction, validateActionId} = require("./actions/middleware")


const router = express.Router()


//1

router.get("/", (req, res, next) => {
  Action.get()
  .then(actions => {
    res.status(200).json(actions)
  })
  .catch(next)
  })

  //2
  router.get("/:id",validateActionId, (req,res,next) => {
    Action.get(req.params.id)
    .then(actions => {
    if(!actions){
      res.status(404)
      next()
    } else{
      res.status(200).json(actions)
    }
  })
    .catch(next)
    })

    //3

  router.post("/",validateActionId, vaildationAction, (req,res,next) => {
    Action.insert(req.action, {notes: req.notes, 
    completed: req.body.completed})
    .then(actions => {
      if(!actions){
        res.status(400)
      }
      else{
        next({
          status:200,
          message: "Post has been found"
        })
      }
    })
    .catch(next)
  })

  //4

  router.put("/:id",vaildationAction, (req,res,next) => {
  
    Action.update(req.params.id)
    .then(actions => {    
  if (!actions) {
    res.status(404).json(actions)
  }
  else{
    res.status(200).json(actions)
  }
  })
  .catch(next)
  })


router.delete("/:id", validateActionId , (req, res, next) => {
  Actions.remove(req.params.id)
  .then(actions => {
    if(!actions){
      res.status(404).json(actions)
    }
    else{
      res.status(200).json(actions)
    }
  })
  .catch(next)
})


module.exports =  router