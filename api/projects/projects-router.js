// Write your "projects" router here!
const express = require('express');
const router = express.Router();

//imports
const Projects = require('./projects-model');



// `[GET] /api/projects`
router.get('/api/projects', async(req,res)=>{
    try{
        const projects = await Projects.get();
        res.status(200).json(projects);


    }//end of try
    catch(err){
        res.status(500).json({ error : {err}});

    }//end of catch
});//end 


// // `[GET] /api/projects/:id`

// router.get('/api/projects/:id', async(req,res)=>{
//     const id = req.params.id;
//     try{
//         const project = await Projects.get(id);
//         if(!project){
//             res.status(404).json({message:`The project with id ${id} does not exsist.`});
//         }else{
//             res.status(200).json(project);
//         }

//     }//end of try
//     catch(err){
//         res.status(500).json({error: `${err}`})

//     }//end of catch
// })


// //  `[POST] /api/projects`
// //   - Returns the newly created project as the body of the response.
// //   - If the request body is missing any of the required fields it responds with a status code 400.
// router.post('/api/projects',async(req,res)=>{
//     const body = req.body;

//     if(!body.name || !body.description){
//         res.status(400).json('Name and Description are required')
//     }else{
//         try{
//             const project = await Projects.insert(body);
//             res.status(201).json(project);
//         }
//         catch(err){
//             res.status(500).json({error:{err}});
//         }
//     }
// })


// //  `[PUT] /api/projects/:id`
// //   - Returns the updated project as the body of the response.
// //   - If there is no project with the given `id` it responds with a status code 404.
// //   - If the request body is missing any of the required fields it responds with a status code 400.
// router.put('/api/projects/:id', async (req,res)=>{
//     const id = req.params.id;
//     const body = req.body;
//     if(!body.name && !body.description){
//         res.status(400).json({message: "Please fill out the required fields"})
//     }else{
//         try{
//             const project = await Projects.update(id, body);
//             res.status(200).json(project)

//         }//end of try
//         catch(err){
//             res.status(500).json({error: `${err}`});
//         }
//     }
// })


// //  `[DELETE] /api/projects/:id`
// //   - Returns no response body.
// //   - If there is no project with the given `id` it responds with a status code 404.
// router.delete('/api/projects/:id', async(req,res)=>{
//     const id = req.params.id;
//     try{
//         const project = await Projects.remove(id);
//         if(!project){
//             res.status(404).json({message: `Project with id ${id} does not exsist`})
//         }else{
//             res.status(200).json(project);
//         }

//     }//end of try
//     catch(err){
//         res.status(500).json({error: `${err}`});
//     }//end of catch
// })


// //  `[GET] /api/projects/:id/actions`
// //   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
// //   - If there is no project with the given `id` it responds with a status code 404.
// router.get('/api/projects/:id/actions', async (req,res)=>{
//     const id = req.params.id;
//     try{
//         const project = await Projects.getProjectActions(id);
//         res.status(200).json(project);

//     }//end of try
//     catch(err){
//         res.status(500).json({error:`${err}`})
//     }
// })


// router.use((err,req,res,next)=>{
    
//     res.status(err.status || 500).json({
//         customMessage : 'something bad happened...',
//         message : err.message,
//         stack: err.stack,
//     })
// })
module.exports = router;