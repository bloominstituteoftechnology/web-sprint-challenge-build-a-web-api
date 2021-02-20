
const actionModel=require("../api/actions/actions-model")
const projectModel=require("../api/projects/projects-model")
function checkActionId(){
    return(req,res,next)=>{
        actionModel.get(req.params.id)
        .then((project) => {
			if (project) {

                //we need to attach project to req
                req.project=project
                next()
				//res.status(200).json(project)
			} else {
				res.status(404).json({
					message: "project not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the project",
			})
		})
        }

    }

    function checkActionUserData(){
        return (req,res,next)=>{
             if (!req.body.name || !req.params.id) {
        return  res.status(400).json({
                message: "data missing",
            })
        }
        
        next()
        }
    }

    function checkId(){
        return(req,res,next)=>{
            projectModel.get(req.params.id)
            .then((project) => {
                if (project) {
    
                    //we need to attach project to req
                    req.project=project
                    next()
                    //res.status(200).json(project)
                } else {
                    res.status(404).json({
                        message: "project not found",
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "Error retrieving the project",
                })
            })
            }
    
        }
    
        
        function checkUserData(){
            return (req,res,next)=>{
                 if (!req.body.name || !req.params.id) {
            return  res.status(400).json({
                    message: "data missing",
                })
            }
            
            next()
            }
        }
    
        module.exports={
            checkId,
            checkUserData,
            checkActionId,
            checkActionUserData
        }
    