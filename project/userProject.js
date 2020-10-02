
const express = require("express");
const router = express.Router();
const project = require("../data/helpers/projectModel.js");

router.get("/", (req, res) => {
  project
    .get()
    .then((success) => {
      res.status(200).json({ success });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ message: "Unable to retrieve project" });
    });
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(500).json({ message: "Name and Desc needed" });
  } else {
    project
      .insert(req.body)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not add" });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id || !changes) {
    res.status(500).json({ message: "ID and changes needed" });
  } else {
    project
      .update(id, changes)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not find user" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "Must provide id" });
  } else {
    project
      .remove(id)
      .then((success) => {
        res.status(200).json({ message: "User deleted", success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not delete" });
      });
  }
});

router.get("/projectActions", (req, res) => {
  const { project_id } = req.body;
  console.log(project_id);
  if (!project_id) {
    res.status(500).json({ message: "Must provide project ID" });
  } else {
    project
      .getProjectActions(project_id)
      .then((success) => {
        res.status(200).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Error" });
      });
  }
});

module.exports = router;