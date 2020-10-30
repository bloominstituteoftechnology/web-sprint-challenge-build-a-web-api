const express = require("express");

const actionDb = require("./actionModel");

const Router = express.Router();

// Router.use((req, res, next) => {
//   console.log("inside the user router");
//   next();
// });

Router.get("/", (req, res) => {
  actionDb
    .get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error the data",
      });
    });
});

Router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.proj);
});

Router.post("/", validateAction, (req, res) => {
  actionDb
    .insert(req.body)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error adding the action" });
    });
});

Router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then((resp) => {
      res.status(200).json({ message: "Action is removed successfully." });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error removing the action" });
    });
});

Router.put("/:id", [validateId, validateAction], (req, res) => {
  const { id } = req.params;
  actionDb
    .update(id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating the action" });
    });
});

// Validations
function validateId(req, res, next) {
  const { id } = req.params;

  actionDb
    .get(id)
    .then((data) => {
      if (data) {
        req.proj = data;
        next();
      } else {
        res.status(400).send("invalid action id");
        next();
      }
    })
    .catch((err) => {
      res.status(500).send("Something didn't work.");
      next();
    });
}

function validateAction(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing action data" });
  } else if (!req.body["project_id"]) {
    res.status(400).json({ message: "Request is missing project_id" });
  }
  next();
}

module.exports = Router;
