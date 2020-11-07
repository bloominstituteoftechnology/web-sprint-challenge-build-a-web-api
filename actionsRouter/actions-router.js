const express = require("express");
const ActionModel = require("../data/helpers/actionModel");
const router = express.Router();

//GET /api/actions
router.get("/", (req, res) => {
  ActionModel.get(req.params.id)
    .then((actions) => {
      res.status(200).json({ message: "List of Actions", Actions: actions });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Can not get List of actions" });
    });
});

//GET ID /api/actions/:id
router.get("/:id", (req, res) => {
  ActionModel.get(req.params.id)
    .then((actions) => {
      res.status(200).json({ message: "Action by Id", ActionById: actions });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server Error: cant find action by ID" });
    });
});

//POST /api/actions
router.post("/", (req, res) => {
  ActionModel.insert(req.params.body)
    .then((postActions) => {
      res
        .status(201)
        .json({ message: "new Action Created", actionCreated: postActions });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server Error: Cant post new action" });
    });
});

//UPDATE /api/actions/:id

//DELETE /api/actions/:id

module.exports = router;
