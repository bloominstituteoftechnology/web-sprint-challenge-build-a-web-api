// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const {
  validateActionId,
  validateRequestBody,
} = require("./actions-middlware");
console.log("actions running");

router.get("/", (req, res) => {
  Actions.get()
    .then((action) => {
      if (!action) {
        res.status(404).json([]);
      } else {
        res.status(200).json(action);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to get Actions" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to get Projects" });
    });
});

router.post("/", validateRequestBody, (req, res) => {
  const newAction = req.body;
  Actions.insert(newAction)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(() => {
      res.status(500).json({ message: "There was an error adding project." });
    });
});

router.put("/:id", validateActionId, validateRequestBody, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (req.body.completed === undefined) {
    res.status(400).json({ message: "Requires the completed field." });
  } else {
    Actions.update(id, changes)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "There was an error updating the user." });
      });
  }
});

router.delete("/:id", validateActionId,(req,res)=>{
    const {id} = req.params;
    Actions.remove(id)
    .then((action)=>{
        res.status(200).json(action)
    }).catch(()=>{
        res.status(500).json({message:"Unable to delete user."})
    })
})
module.exports = router;
