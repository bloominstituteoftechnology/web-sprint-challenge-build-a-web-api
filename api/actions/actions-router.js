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
                res.status(200).json(response)
            }
        })
        .catch((error) => {
            // console.log("error",error)
            res.status(500).json({
                message: 'Error retrieving the actions.',
            });
        });
}); 

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log("id: ", id)

    Actions.get()
    .then((actions) => {
        console.log("actions: ", actions); // response is an array with all actions
        if (actions) {
            const filteredActions = actions.filter((action => {
                console.log("Action project id: ", action.project_id)
                console.log("id: ", id)
                return action.project_id === Number(id);
            }));
            console.log("filteredActions: ",filteredActions)
            res.status(200).json(filteredActions);
        } else {
            res.status(404).json([]);
        }
    })
    .catch((error) => {
        console.log("error", error)
        res.status(500).json({ message: `Error, the project of id ${id} could not be deleted: ${error}`})
    })

});


module.exports = router;