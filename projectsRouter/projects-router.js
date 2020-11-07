const express = require("express");
const ProjectModel = require("../data/helpers/projectModel");
const router = express.Router();

//GET /api/projects
router.get("/", (req, res) => {
  ProjectModel.get(req.body)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving characters" });
    });
});

module.exports = router;
