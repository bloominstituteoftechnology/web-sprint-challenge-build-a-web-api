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
    Projects.get(req.query)
        .then(response => {
            console.log("response: ", response)
            res.status(200).json(response);
        })
        .catch(error => {
            console.log("error",error)
            res.status(500).json({
                message: 'Error retrieving the projects.',
            });
        });
}); 

// router.get('/:id', (req, res) => {

// })

module.exports = router;