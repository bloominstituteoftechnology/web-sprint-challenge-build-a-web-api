// Write your "projects" router here!
const express = require('express')
const {
    handleError,
    validateProject,
    validateProjectId,
} = require('./projects-middleware')

const Projects = require('./projects-model')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            if (projects) {
                res.status(200).json(projects)
            } else {
                res.status(200).json([])
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The projects could not be received"
            })
        })
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.project)
})


router.post('/', (req, res) => {
   const newProject = req.body;
   if (newProject.name && newProject.description) {
        Projects.insert(newProject)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "The projects could not be received"
                })
            })
   } else {
       res.status(400).json({
           message: "Please provide a name and description"
       })
   }

})

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    const updatedProject = await Projects.update(req.params.id, req.body)
    res.status(200).json(updatedProject)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id) 
    .then(() => {
        res.status(200).json({ message: "Your project was deleted"})
    })
    .catch(next);
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const projectActions = await Projects.getProjectActions(req.params.id)
        res.json(projectActions)
    } catch (err) {
        next(err)
    }
})

router.use(handleError);

module.exports = router;