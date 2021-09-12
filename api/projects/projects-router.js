// Write your "projects" router here!

const express = require('express')
const router = express.Router()
// or const router = require("express").Router() ? Guess that's the same reformatted
const Projects = require('./projects-model')
const { projectLogger, validateProjectId, validateProject } = require('./projects-middleware')

//I am aware that logger isn't used. Added it for practice and later reference.

//setup complete. starting with project endpoints, top to bottom


//--------------------------------------------------\\
//-----------------projects


router.get('/', (req, res, next) => { //eslint-disable-line
    Projects.get()                    // ^ next needed here?
            .then(projects =>
                res.json(projects) //default status code is 200
            )
            .catch(err => {
                res.status(500).json({ //or 501 or other?
                    message: "The users information could not be retrieved",
                    err: err.message,
                    stack: err.stack
                })
            })
})

{ // delete 1.0
//array returns, creating delete route (or is it called endpoint here?) to check what happens if DB empty

// router.delete('/:id', async (req,res,next) => { // EDIT NOTE: add user id validation later
//     try {
//         await Projects.remove(req.params.id)
//         res.json(req.project)
//     }
//     catch(err) {
//         next(err)
//     }
// }) 
}

//need to return 404 if no id, creating new version of router.delete

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

// now that the DB is an empty array, I need to fill it with something again. proceeding with post

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

// now that there is a new project, I'll create a bunch of test projects,
// and then return a specific one by id -- 404 if none

// note to reviewer: the first project was deleted, yet the first [new] project starts with the first id
// how come? 🤔 (technical explanation)

router.get('/:id', async (req, res) => {

    try {
        //throw new Error('ka-bloinGGGGGGZ!')
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

// works. now on to changing an existings project's details with put aka. update aka. u from CRUD


{ // put 1.0
// router.put('/:id', (req, res) => {
//     const {name, description, completed} = req.body
//     if (!name || !description || !completed) {
//         res.status(400).json({
//             message: "Please provide the name and description for the project"
//         })
//     } else {
//         Projects.get(req.params.id)
//         .then (stuff =>{
//             console.log("before update", stuff)
//             if(!stuff) {
//                 res.status(404).json({
//                     message: "The project with the specified ID does not exist. ID correct?"
//                 })
//             } else {
//                 return Projects.update(req.params.id, req.body)
//             }
//         })
//         .then(project => {
//             if(project){
//                 return Projects.get(req.params.id)
//             }
//         })
//         .then(project => {
//             if (project) {
//                 res.json(project)
//                 console.log("after update", project)
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: "There was an error while creating and saving the project to the database",
//                 err: err.message,
//                 stack: err.stack
//             })
//         })
//     }
// })
}

// that wasn't it, trying different syntax


{// put 1.1
// router.put('/:id', (req,res, next) => {
//     Projects.update(req.params.id, req.body)
//     .then( ()=> {
//         return Projects.get(req.params.id)
//     })
//     .then(project=>{
//         res.json(project)
//     })
//     .catch(next)
// })
}

// almost works, but lacks 404/400. conditional logic is needed after all. tried a few wrappers,
// none worked. tweaking prior attempt instead

{ // put 1.2
// router.put('/:id', (req,res, next) => {
//     const {name, description, completed} = req.body
//     if (!name || !description || !completed) {
//         res.status(400).json({
//             message: "Missing name, description or completion status (enter 1 for true or 0 for untrue)"
//         })
//     } else {
//         Projects.update(req.params.id, req.body)

//         .then( ()=> {
//             return Projects.get(req.params.id)
//         })
//         .then(project=>{
//             res.json(project)
//         })
//         // .then( (stuff)=> {
//         //     console.log(stuff)
//         // })
//         .catch(next)
//     }
// })
}

//somehow the conditional logic doesn't work, trying to wrap it a bit more and differently

{ // put 1.3
// router.put('/:id', async (req,res) => {
//     try {
//         const possibleProject = await Projects.get(req.params.id)
//         if(!possibleProject) {
//             res.status(404).json({
//                 message: "The project with the specified ID does not exist. Ensure correct ID. Array may start at #2"
//             })
//         } else {
//             const {name, description, completed} = req.body
//             if (!name || !description || !completed) {
//                 res.status(400).json({
//                     message:"Missing name, description or completion status (enter 1 for true or 0 for untrue)"
//                 })
//             } else {
//                 const updatedProject = await Projects.update(req.params.id, req.body)
//                 res.status(200).json(updatedProject)
//                 console.log('Success! Project updated.')
//                 console.log("updatedProject -->", updatedProject)
//                 console.log("updated req.body -->", req.body)
//             }
//         }
//     } catch (err) {
//         res.status(500).json({
//             message: "Error 500: The project information could not be modified",
//             err: err.message,
//             stack: err.stack
//         })
//     }
// })
}

//this makes lense and less sense. starting to suspect there is a bug in test. 
// last attempt before movig on to other endpoint: tweaked 1.1

{ // put 1.4 
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

}

// can't make sense of this. if you see read this and know what's wrong,
// please message me on the Lambda slack or alternatively on LinkedIn via DM
// moving on with middleware for next version

router.put("/:id", validateProjectId, validateProject, (req, res, next) => { // //eslint-disable-line
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

// this makes no sense. test still says it's wrong. I'm running out of syntax ideas
// moving on with everything else. 11/27 tests are passed at this point. should be 13

{ // get actions 1.0

// router.get('/:id/actions', validateProjectId, (req,res,next) => {
//     try {
//     const result =  Projects.getProjectActions(req.params.id)
//     res.json(result)
//     console.log(result)
//     } catch (err) {
//          next(err)
//     }
// })
}

// while it does return 404 with the wrong id,
// it also returns an empty object instead of an array when the id matches
// how is beyond me, new attempt it is

router.get("/:id/actions", validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(projects => res.json(projects))
        .catch(err => next(err))
})

// not sure how removing try/catch fixed it, let me know if you know
// moving on to actions

module.exports = router 

//--------------------------------------------------\\
//-----------------actions

//see actions-router.js in the actions folder within the api folder
