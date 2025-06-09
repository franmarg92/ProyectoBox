const { HoursService } = require ('../services')


const getAllHours = async (req, res, next) => {

    try {
        const hours = await HoursService.getAllHours();
        res.status(200).json(hours)
    } catch (error) {
        next(error)
    }
    
}

module.exports = { getAllHours }