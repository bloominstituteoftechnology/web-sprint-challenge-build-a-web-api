// const Project = require('./actions-model')

// async function theProjects(req, res, next) {
//   try {
//     const user = await User.getById(req.params.id)
//     if (!user) {
//       res.status(404).json({
//         message: 'user not found'})
//     } else {
//       req.user = user
//       next()
//     }
//   } catch (err) {
//     next(err)
//   }
// }