const {DaysService} = require ('../services')


const getAllDays = async (req, res, next) => {

    try {
        const days = await DaysService.getAllDays();
        res.status(200).json(days)
    } catch (error) {
        next(error)
    }
    
}

module.exports = {getAllDays}