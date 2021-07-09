const Project = require('./projects-model')

async function validateProjectId (req, res, next) {
    console.log("middleware connected")
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({message: "project not found"})
        } else {
            req.project = project
            next()
        }

    } catch (err) {
        res.status(500).json({
            message: "issue finding project"
        })
    }
    // } catch (err) {
    //     next(err)
    // }
}

module.exports = {
    validateProjectId,
}