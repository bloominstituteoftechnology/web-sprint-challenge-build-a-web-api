// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => next(error));
    });



    router.delete('/:id', async (req,res) => { // EDIT NOTE: add user id validation later
        try {
            //throw new Error('aight')
            const project = await Projects.get(req.params.id)
            if (!project) {
                console.log(project)
                res.status(404).json({
                    message: "The projet with the specified ID does not exist"
                })
            } else {
                //console.log(project)
                await Projects.remove(req.params.id)
                res.json(project, req.project)
            }
        } catch (err) {
            res.status(500).json({
                message: "The project could not be removed, but there may be one.",
                err: err.message,
                stack: err.stack,
            })
        }
    })


    router.post('/', (req,res) => {
        const {name, description, completed} = req.body
        if (!name || !description) {
            res.status(400).json({
                message: "Please provide the name and description for the project"
            })
        } else {
            console.log('success')
            Projects.insert({ name, description, completed})
            .then ( ({id}) => {
                console.log('check -->', id)
                return Projects.get(id)
            })
            .then(project => {
                res.status(201).json(project)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while creating and saving the project to the database",
                    err: err.message,
                    stack: err.stack
                })
            })
        }
    })



router.get('/:id', async (req, res) => {

    try {
        const project = await Projects.get(req.params.id)
        console.log('-->', project)
        if(!project){
            res.status(404).json({
                message: "The project with the specified ID does not exist. Array starts at Nr2"
            })
        } else {
            res.json(project)
        }
    } catch (err){
        res.status(500).json({
            message: "The project with the specified ID does not exist",
            err: err.message,
            stack: err.stack
    })
    }
})




router.put('/:id', (req,res, next) => {
    const {name, description, completed} = req.body
    if (!name || !description || !completed) {
        res.status(400).json({
            message: "The project with the specified ID does not exist. Ensure correct ID. Array may start at #2"
        })
    } else {
        Projects.update(req.params.id, req.body)
        .then( ()=> {
            return Projects.get(req.params.id)
        })
        .then(project=>{
            res.json(project)
        })
        .catch(next)
    }
})







router.put("/:id", (req, res, next) => { // //eslint-disable-line
    const id = req.params.id
    const body = req.body
    Projects.get(id)
        .then(() => {
            return Projects.update(id, body)
        })
        .then(() => {
            return Projects.get(id)
        })
        .then(project => res.json(project))
        .catch(err => next(err))
});
module.exports = router;
