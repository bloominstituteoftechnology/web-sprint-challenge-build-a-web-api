// Write your "actions" router here!
const Actions = require('./actions-model');
const express = require('express');
const router = express.Router();

/*
module.exports = {
  get,
  insert,
  update,
  remove,
};
*/


router.get('/', (req, res) => {
    // console.log("req.query: ", req.query)
    Actions.get()
        .then((response) => {
            // console.log("response: ", response) // response is array of all actions
            if (!response) {
                res.status(404).json([])
            } else {
                res.status(200).json([response])
            }
        })
        .catch((error) => {
            // console.log("error",error)
            res.status(500).json({
                message: 'Error retrieving the actions.',
            });
        });
}); 


module.exports = router;