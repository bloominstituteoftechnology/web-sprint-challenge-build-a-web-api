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

    Actions.get(req.params.id)
    
        .then((response) => {
            console.log("response: ", response); // response
            if (!response) {
                res.status(404).json({ message: `Action of ${req.params.id} not found`})
            } else {
                console.log("we are in the else")
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            // console.log("error", error)
            res.status(500).json({ message: `Error retrieving the project of id ${req.params.id}: ${error.message}`})
        })
});

router.post('/', (req, res) => {
    const body = req.body;
    console.log("req.body: ", body)


    if (!body || !body.project_id || !body.description || !body.notes ) {
        res.status(400).json({ message: `All action fields required.`})
    } else if (body.completed === null) {
        res.status(400).json({ message: `All action fields required.`})
    } else {

        Actions.insert(req.body)
            .then((response) => {
                console.log("response", response) // response is posted action
                res.status(200).json(response);
            })
            .catch((error) => {
                console.log("error", error)
                res.status(500).json({ message: `Error retrieving the action of id ${req.params.id}: ${error.message}`})
            })
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    console.log("id and changes: ", req.params.id + req.body)

    if (!changes) {
        res.status(400).json({ message: `All actions fields required.`})
    } else {

        Actions.update(id, changes)
        .then((updateResponse) => {
            console.log("updateResponse", updateResponse) // response is either null or updated project object
            if (!updateResponse) {
                res.status(404).json({ message: `Action of id ${id} not found`})
            } else {
                res.status(200).json(updateResponse);
            }
        })
        .catch((updateError) => {
            console.log("updateError", updateError)
            res.status(400).json({ message: `Unable to update action. Missing fields.`})
        })
    }
});

module.exports = router;