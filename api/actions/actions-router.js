// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const mw = require("../middleware/middleware");

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      res.status(500).json({ message: `Server Error: ${error}.` });
    });
});

router.get("/:id", mw.validateActionId, (req, res) => {
  res.status(200).json(req.actions);
});

router.post("/", mw.validateActionBody, (req, res) => {
  const action = req.body;
  Actions.insert(action).then((actions) => {
    console.log(actions);
    res.status(201).json(actions);
  });
});

router.put("/:id", mw.validateActionBody,mw.validateActionId,(req,res)=>{
    const changes =req.body
    const id = req.params.id;
    Actions.update(id, changes)
    .then((actions)=>{
        res.status(200).json(actions)
    })

})

router.delete("/:id", mw.validateActionId,(req,res)=>{
    const id =req.params.id;
    Actions.remove(id)
    .then((actions)=>{
        res.status(203).json({message:`Action: ${id} has been deleted.`})
    })
})
module.exports = router;
