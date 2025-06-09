const { DaysModel} = require('../models')

const getAllDays = async () => {
    try {
       const days = await DaysModel.findAll({include:{all:true}});
       return days
    } catch (error) {
        throw error
    }
}

module.exports = {getAllDays}