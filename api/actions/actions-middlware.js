// add middlewares here related to actions
const Actions = require('../actions/actions-model.js')

const checkActionId = async (req,res,next)=>{
    const {id}=req.params
    const action = await Actions.get(id)
    if(!action){
        res.status(404).json({ message: "action not found" })
    }else{
        next()
    }
}

module.exports={
    checkActionId
} 