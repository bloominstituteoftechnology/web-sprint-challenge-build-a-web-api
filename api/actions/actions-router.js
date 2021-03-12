// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", (req, res next) => {
    
})

router.get("/:id", (req, res, next) => {
    
})

router.post("/", (req, res) => {
    
})

router.put("/:id", (req, res, next) => {
    
})

router.delete("/:id", (req, res, next) => {
    
})

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wromg in the users router",
  });
});

module.exports = router;
