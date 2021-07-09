const express = require('express')
// pull in model
// pull in middleware


const router = express.Router()

router.get ('/', (req, res) => {
    console.log("GET endpoint connected")
})

router.get ('/:id', (req, res) => {
    console.log("GET by ID endpoint connected")
})

router.post ('/', (req, res) => {
    console.log("POST endpoint connected")
})

router.put ('/:id', (req, res) => {
    console.log("PUT endpoint connected")
})

router.delete ('/:id', (req, res) => {
    console.log("DELETE endpoint connected")
})

module.exports = router