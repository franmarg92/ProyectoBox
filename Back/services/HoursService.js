const { HoursModel} = require('../models')


const getAllHours = async () => {
    try {
        const hours = await HoursModel.findAll({include:{all:true}})
        return hours
    } catch (error) {
        throw error
    }
}

module.exports = {getAllHours}