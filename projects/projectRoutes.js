const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
    db.get().then(projects=>{
        res.status(200).json(projects);
    }).catch(err=>{
        res.status(500).json({message: "A server error occurred"});
    });
})

module.exports = router;
