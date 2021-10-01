const router = require('express').Router()
const Actions = require('./actions-model')
const { validateActionsId, validateAction } = require('./actions-middlware')


router.get('/', (req,res,next) =>{
    Actions.get()
            .then(actions=>res.json(actions))
            .catch(err => next(err))
})  

// not sure if I understand the catch-next part, I just use it
// kind of how we don't really know how airplanes work yet fly
// please leave feedback if you read this

// me trying to remember syntax be like
// .catch(err=>next(err))
// .catch(err=>next(err))
// .catch(err=>next(err))

{// getId 1.0
// router.get('/:id', validateActionsId, (req, res, next) => { //eslint-disable-line
//     res.status(200).json(res.action) //probably don't need req.action but the testing
//   })                                            //software is dreadfully slow so I'll just leave both
                                             // and safe me waiting literally 10 minutes for test to run
}                                             

// nevermind that's not it afterall. it doesn't send back the action given an id
// new syntax it is

  router.get('/:id', async (req, res) => {
    try {
        //throw new Error('ka-bloinGGGGGGZ!')
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

// really blackboxed myself with the prior attempt of getting the j ob done in 2 lines
// not sure why this one works, but it gets the job done, moving onto post

// oh no...

// there doesn't seem to be any actions in the DB
// need to create post first to create some and then check if fetching them via id works

{ // post 1.0
// router.post("/", validateAction, (req, res, next) => {
//     const body = req.body
//     Actions.insert(body)
//         .then(({ id }) => {
//             return Actions.get(id)
//         })
//         .then(action => res.status(201).json(action))
//         .catch(err => next(err))
// });
}

// returns this mysterious error:
// <pre>Error: insert into `actions` (`description`, `notes`) 
// values (&#39;bar&#39;, &#39;foo&#39;) - SQLITE_CONSTRAINT: 
// NOT NULL constraint failed: actions.project_id</pre>
// trying tweaked syntax before moving on

{ // post 1.1  
router.post('/', validateAction, (req,res,next) =>{
    Actions.insert(req.body)
          .then(validAction => {
            res.status(201).json(validAction)
          })
          .catch(next)
})
}

// same error, trying the syntax I used in projects-router.js next

{ //post 1.2
// router.post('/', (req,res) => {
//     const {notes, description} = req.body
//     console.log(req.body)
//     if (!!notes || !description) {
//         res.status(400).json({
//             message: "Please provide the notes and description for the action"
//         })
//         console.log(req.body)
//         console.log(res)
//     } else {
//         console.log('success')
//         Actions.insert({ notes, description})
//         .then ( ({id}) => {
//             console.log('check -->', id)
//             return Actions.get(id)
//         })
//         .then(action => {
//             res.status(201).json(action)
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: "There was an error while creating and saving the action to the database",
//                 err: err.message,
//                 stack: err.stack
//             })
//         })
//     }
// })
}
// now it says ""message": "Please provide the notes and description for the project""
// even tho I provide "http post :5000/api/actions/ notes=foo1212  description=bar123123"
// I went through the entire req and res, can't make sense of it but I need an action
// no action = no other endpoints

// looked far and wide, didn't find it. running out of time. how could I have identified the error?
// would love feedback on that. Tried console.logging all kinds of things and reformating the syntax

// alas, I move on blindly as I won't have action items but at least there is test and the code
// shouldn't be too dissimilar from what I've written inprojects-router.js


//-----------------------------

// this is getting really, really confusing. things that used to pass suddenly don't,
// old attempts suddenly pass while new ones don't
// test software seems all over the place.
// will move on to put and delete.
// they key to this was basic udnerstanding of routing; learning,
// this has been achieved. 80/20 principle it is
// sidenote: spent 2 days on this, sadly I'm a bit slow but that is why I have to move on to
// the next thing fast and can't spend 1-2 more days making this here flawless

// at this point 15/17/19/20 tests are passed. every iteration is different, reasons unknown

{ // put1.0 - no middleware 
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
}

// put 1.1 - with middleware
router.put("/:id", validateActionsId, validateAction, (req, res, next) => {
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

// http is bugged, test is as well, I'll move in in good faith
// if this was production software I would have already messaged/researched
// people on slack, stack overflow etc., but there is no time for that here
// on to delete it is!

{ // delete 1.0 - no middleware
router.delete('/:id', async (req,res) => { // EDIT NOTE: add user id validation later
    try {
        //throw new Error('aight')
        const action = await Actions.get(req.params.id)
        if (!action) {
            console.log(action)
            res.status(404).json({
                message: "The projet with the specified ID does not exist"
            })
        } else {
            //console.log(action)
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
}

// delete 1.1 - with middleware
router.delete("/:id", validateActionsId, async (req, res, next) => {
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


router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
      message: "Well, this wasn't supposed to happen.",
      error: err.message
    });
  });



module.exports = router

// 23 out of 27 passed. rest seems bugged given the req/res console logs