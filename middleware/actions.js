const actionDB = require("../data/helpers/actionModel");

/// LOOKS FOR findById MIDDLEWARE /api/actions/:id
function checkUserID() {
  return (req, res, next) => {
    actionDB
      .get(req.params.id)
      .then((actions) => {
        if (actions) {
          //middlware to fIND BY ID and send to find by ID in actions
          req.actions = actions;
          //
          next();
        } else
          res
            .status(404)
            .json({ message: `can't find id by #${req.params.id}` });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ message: "Server Error: cant find action by ID" });
      });
  };
}

///LOOKS FOR DELETE USER BY ID /api/actions/:id
function deletePostID() {
  return (req, res, next) => {
    const { id } = req.params;
    actionDB
      .remove(id)
      .then((removeUser) => {
        if (removeUser) {
          //apply middleware and sent to delte by ID
          req.removeUser = removeUser;
          next();
        } else {
          res.status(404).json({ message: `cant update user, 404 error` });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "500 ERROR: something went wrong, Can not delete user",
        });
      });
  };
}

//check body Data for require fields
function checkActionBodyData() {
  return (req, res, next) => {
    if (
      !req.body.project_id ||
      !req.body.description ||
      !req.body.notes ||
      !req.body.completed
    ) {
      return res
        .status(400)
        .json({ message: "missing project_id, description, notes, completed" });
    }
    //stop here and send to next stack
    next();
  };
}

module.exports = {
  checkUserID,
  deletePostID,
  checkActionBodyData,
};
