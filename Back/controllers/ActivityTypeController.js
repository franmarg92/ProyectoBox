const { ActivityTypeService} = require ('../services')


const createActivity = async (req, res, next) => {
    try {
        const {name } = req.body
        const newActivity = await ActivityTypeService.createActivity(name)
        res.status(200).json(newActivity)
    } catch (error) {
        next(error)
    }
    
}

module.exports = {createActivity}
