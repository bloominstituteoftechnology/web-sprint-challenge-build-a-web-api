// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model');
const { checkNew, checkNewId,validatePost} = require('../middleware/index.js')
const router = express.Router();

// router.use((req,res,next) =>{
//     console.log('in actions router')
//     next();
// })

// Endpoints
router.get('/', (req,res,next) =>{
    console.log('get / ',req)
    Actions.getActionsdb('/',validatePost, (req,res,next))
        .then( a =>{
            console.log(req.body,a);
            res.status(200).json(a);
            // next();
        })
        .catch( er =>{
            next();
            console.log(er);
            // res.status(500).json({
            //     message: 'Error retrieving the actions'
            // });
        });
});

router.get('/:id', (req, res,next) => {
    // do your magic!
    // this needs a middleware to verify post id
    Actions.get(req.params.id,checkNewId,(req,res,next))
      .then(p =>{
        console.log('gettingid',p,req.params.id)
        try{
          if(p !== undefined){
  
            res.status(200).json(p)
            }else{
              res.status(404).json({message:'action not found 404 as undefined'})
            }
        }catch(e){
          
          res.status(500).json({message: '500 error /:id actions-router.js possible Disconection',errormsg:e })
        }
        
      })
      .catch( er =>{
        next(er)
      })
  });

//localhost:4000/api/actions/?id=1&project_id=1&description=Fork and Clone Repository&notes=RepoURL=https://github.com/LambdaSchool/Sprint-Challenge-Node-Express&completed=0
// router.post('/',   (req,res,next) =>{

//     Actions.insert(req.body,validatePost, (req,res,next))
//         .then(at => {

//             res.status(201).json(at);
//             // next(at);
//         })
//         .catch(er =>{
//             next(er)
//         }) 


// })

/*
"insert into `actions` (`completed`, `description`, `notes`, 
`project_id`) values ('1', 'aaaa', 'assaSprint-Challenge-Node-Express', 
' 7') - SQLITE_CONSTRAINT: FOREIGN KEY constraint failed",
"insert into `actions` (`action`) values ({\"project_id\":\" 7\",
\"description\":\"aaaa\",\"notes\":\"assaSprint-Challenge-Node-Express\",
\"completed\":\"1\"}) - SQLITE_ERROR: table actions has no column named action"

.returning() is not supported by sqlite3 and will not have any effect.
(node:492921) UnhandledPromiseRejectionWarning: Error: insert into `actions` (`action`) values ({"project_id":" 7","description":"aaaa","notes":"assaSprint-Challenge-Node-Express","completed":"1"}) - SQLITE_ERROR: table actions has no column named action
(Use `node --trace-warnings ...` to show where the warning was created)
(node:492921) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
(node:492921) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
*/

router.post('/', validatePost, async (req,res,next) =>{

  const body = req.body;
  console.log(body)
  try{
    const dta = await  Actions.insertPost(body)
    // res.json(dta);
    next(dta)
  }catch(e){
    next(e)
  }
})







router.use((error, req, res, next) => {
    res.status(500).json({
      info: 'something horrible happened inside the actions router',
      message: error.message,
      stack: error.stack,
    })
  })


  module.exports = router;