// Write your "projects" router here!
const Projects = require('./projects-model');
const express = require('express');
const router = express.Router();

/* from PROJECT MODEL
module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectActions,
};
*/


// PROJECTS ENDPOINTS

router.get('/', (req, res) => {
    // console.log("req.query: ", req.query)
    Projects.get()
        .then((response) => {
            // console.log("response: ", response)
            if (!response) {
                res.status(404).json([])
            } else {
                res.status(200).json(response)
            }
        })
        .catch((error) => {
            // console.log("error",error)
            res.status(500).json({
                message: 'Error retrieving the projects.',
            });
        });
}); 

router.get('/:id', (req, res) => {

    Projects.get(req.params.id)
    
        .then((response) => {
            // console.log("response: ", response);
            if (!response) {
                res.status(404).json({ message: `Project of ${req.params.id} not found`})
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
    // console.log("req.body: ", body)

    if (!body || !body.name || !body.description ) {
        res.status(400).json({ message: `All project fields required.`})
    } else {

    Projects.insert(req.body)
        .then((response) => {
            console.log("response", response)
            res.status(200).json(response);
        })
        .catch((error) => {
            // console.log("error", error)
            res.status(500).json({ message: `Error retrieving the project of id ${req.params.id}: ${error.message}`})
        })

    }
});

// })

module.exports = router;