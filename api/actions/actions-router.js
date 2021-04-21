// Write your "actions" router here!
const express = require("express");
const { getProjectActions } = require("../projects/projects-model");
const Actions = require("./actions-model");
const router = express.Router();

//
// [GET] /api/actions returns an array of actions (or an empty array) as the body of the response.
router.get("/actions", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting actions" });
    });
});
//[GET] /api/actions/:id returns an action with the given id as the body of the response.
router.get("/actions/:id", (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json({ action });
    })
    .catch((err) => {
      console.log(err);
      next({
        code: 500,
        message: `Crashed on getting action ${req.params.id}`,
      });
    });
});

module.exports = router;
