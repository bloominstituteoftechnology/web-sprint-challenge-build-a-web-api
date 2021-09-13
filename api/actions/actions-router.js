// Write your "actions" router here!
const router = require('express').Router()
const Actions = require('./actions-model')


router.get('/', (req,res,next) =>{
    Actions.get()
            .then(actions=>res.json(actions))
            .catch(err => next(err))
})


  router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id)
        console.log('-->', action)
        if(!action){
            res.status(404).json({
                message: "The action with the specified ID does not exist. Array starts at Nr2"
            })
        } else {
            res.json(action)
        }
    } catch (err){
        res.status(500).json({
            message: "The action with the specified ID does not exist",
            err: err.message,
            stack: err.stack
    })
    }
})

router.put('/:id', (req,res, next) => {
    const {notes, description,} = req.body
    if (!notes || !description ) {
        res.status(400).json({
            message: "The action with the specified ID does not exist. Ensure correct ID. Array may start at #2"
        })
    } else {
        Actions.update(req.params.id, req.body)
        .then( ()=> {
            return Actions.get(req.params.id)
        })
        .then(action=>{
            res.json(action)
        })
        .catch(next)
    }
})


// put 1.1 - with middleware
router.put("/:id", (req, res, next) => {
    const id = req.params.id
    const body = req.body
    Actions.get(id)
        .then(() => {
            return Actions.update(id, body)
        })
        .then(() => {
            return Actions.get(id)
        })
        .then(action => res.json(action))
        .catch(err => next(err))
});




router.delete('/:id', async (req,res) => { // EDIT NOTE: add user id validation later
    try {

        const action = await Actions.get(req.params.id)
        if (!action) {
            console.log(action)
            res.status(404).json({
                message: "The projet with the specified ID does not exist"
            })
        } else {

            await Actions.remove(req.params.id)
            res.json(action, req.action)
        }
    } catch (err) {
        res.status(500).json({
            message: "The action could not be removed, but there may be one.",
            err: err.message,
            stack: err.stack,
        })
    }
})



router.delete("/:id", async (req, res, next) => {
    const id = req.params.id
    try{
        const actionId = await Actions.get(id)
        if(actionId){
            await Actions.remove(id)
            res.json(actionId)
            next()
        }
    }catch(err){
        next(err)
    }
});


router.use((err, req, res) => {
    res.status(500).json({
      message: "Error",
      error: err.message
    });
  });



module.exports = router
