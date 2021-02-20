// Write your "actions" router here!
const express = require("express")
const Actions = require('./actions-model')
const {checkActionId, checkActionUserData}=require('../../middleware/mw')
const router = express.Router()
router.use(express.json())


router.get("/", (req, res,next) => {
   
    const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
        id:req.params.id
	}
Actions.get(options)
.then((result) => {
    console.log("\033[31m[This is in response to \033[34m[GET Method]\033[31m from projectRouter]")
    res.status(200).json(result)
})
.catch((error) => {

    next(error)


})
})

router.get("/:id",checkActionId(), (req, res) => {

			res.status(200).json(req.project)
        })
        router.post("/",checkActionUserData(), (req, res) => {
            // if (!req.body.name ) {
            //     return res.status(400).json({
            //         message: "Missing project name ",
            //     })
            // }
        
            actions.insert(req.body)
                .then((project) => {
                    res.status(201).json(project, checkId)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({
                        message: "Error adding the project",
                    })
                })
        })



        router.put("/:id",checkActionUserData(),checkActionId(), (req, res) => {
         
        
            actions.update(req.params.id, req.body)
                .then((user) => {
                    if (user) {
                        res.status(200).json(user)
                    } else {
                        res.status(404).json({
                            message: "The user could not be found",
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({
                        message: "Error updating the user",
                    })
                })
        })
        
		



router.delete("/:id", (req, res) => {
	actions.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The project has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The project could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the project",
			})
		})
})


module.exports = router