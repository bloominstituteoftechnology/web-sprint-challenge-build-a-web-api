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



router.use((error, req, res, next) => {
    res.status(500).json({
      info: 'something horrible happened inside the actions router',
      message: error.message,
      stack: error.stack,
    })
  })


  module.exports = router;