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
              res.status(404).json({message:'post not found 404 as undefined'})
            }
        }catch(e){
          
          res.status(500).json({message: '500 error /:id posts-router.js possible Disconection',errormsg:e })
        }
        
      })
      .catch( er =>{
        next(er)
      })
  });


router.use((error, req, res, next) => {
    res.status(500).json({
      info: 'something horrible happened inside the actions router',
      message: error.message,
      stack: error.stack,
    })
  })


  module.exports = router;