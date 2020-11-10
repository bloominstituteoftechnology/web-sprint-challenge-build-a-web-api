const express = require("express");
const {
  checkUserID,
  deletePostID,
  checkActionBodyData,
} = require("../middleware/actions");

const ActionModel = require("../data/helpers/actionModel");
const router = express.Router();

//GET /api/actions
router.get("/", (req, res) => {
  ActionModel.get(req.params.id)
    .then((actions) => {
      if (actions) {
        res
          .status(200)
          .json({ message: "List of Actions", Action_List: actions });
      } else {
        res.status(404).json({ message: `can't retrieve list of actions` });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Can not get List of actions" });
    });
});

//GET ID /api/actions/:id
router.get("/:id", checkUserID(), (req, res) => {
  res.status(200).json({ message: "Action by Id", ActionById: req.actions });
});

//POST /api/actions
router.post("/", checkActionBodyData(), (req, res) => {
  const newUser = req.body;
  ActionModel.insert(newUser)
    .then((postUser) => {
      if (postUser) {
        res
          .status(201)
          .json({ message: "new user posted", user_posted: postUser });
      } else {
        res.status(404).json({ message: `cant post a user, check req.body` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "500 error: something went wrong, cant not post action",
      });
    });
});

//UPDATE /api/actions/:id
router.put("/:id", checkUserID(), (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  ActionModel.update(id, changes)
    .then((updateAction) => {
      if (updateAction) {
        res.status(200).json({
          message: "Success, user updated",
          action_updated: updateAction,
        });
      } else {
        res.status(404).json({ message: `cant update user, 404 error` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "500 ERROR: something went wrong, Can not update action",
      });
    });
});

//DELETE /api/actions/:id
//aded middleware checkuseID and dleetePOSTID
router.delete("/:id", checkUserID(), deletePostID(), (req, res) => {
  res
    .status(200)
    .json({ message: "Success, user deleted", user_deleted: req.removeUser });
});

module.exports = router;
