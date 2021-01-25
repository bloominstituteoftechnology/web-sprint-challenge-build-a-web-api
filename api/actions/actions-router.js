// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model');

const router = express.Router();

router.use((req,res,next) =>{
    console.log('in actions router')
    next();
})

// Endpoints
router.get('/',(req,res,next) =>{
    Actions.get(req.query)
        .then( a =>{
            res.status(200).json(a);
        })
        .catch( er =>{
            console.log(er);
            res.status(500).json({
                message: 'Error retrieving the actions'
            });
        });
});

