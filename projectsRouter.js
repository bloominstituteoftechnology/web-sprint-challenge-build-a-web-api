const express = require("express");

const Projects = require("./data/helpers/projectModel");

const router = express.Router();

router.get("/api/projects", (req, res) => {
  Projects.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "get all - not working",
      });
    });
});

function validID(req, res, next) {
  Projects.get(req.params.id)
    .then((data) => {
      if (data) {
        req.project = data;
        next();
      } else {
        res
          .status(400)
          .json({ message: "the project with that id does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "validID - not working",
        error: err,
      });
    });
}

module.exports = router;
