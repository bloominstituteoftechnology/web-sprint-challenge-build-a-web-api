 const yup = require('yup');
const server = require('../server');
 const Actions = require('./actions-model');

 async function validateActionId(req, res, next){
     try{
         const validatedId = await Actions.get(req.params.id);

         console.log('validatedId', req.params.id)

         if(!validatedId){
             next({ status: 404, message: 'action not found'})
         } else {
             req.action = validatedId;
             next();
         }
     }
     catch(err){
         next(err);
     }
 }

 const validateActionSchema = yup.object().shape({
    description: yup
        .string()
        .trim()
        .required('must fill in description')
        .min(1, 'min 1 char'),
    notes: yup
        .string()
        .trim()
        .required('must fill in notes')
        .min(1, 'min 1 char'),
    completed: yup
        .boolean()
        .required('must specify if action is complete or incomplete'),
    project_id: yup
    .number()
    .required('you must provide a project id')
 })

 async function validateAction(req, res, next){
     try {
        const validatedAction = await validateActionSchema.validate(req.body);

        req.body = validatedAction;
        next();
     }
     catch(err){
         next({ status: 400, message: 'missing required field' });
     }
 }

 module.exports = {
     validateActionId,
     validateAction
 }