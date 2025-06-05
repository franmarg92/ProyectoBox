const { ActivityModel} = require ('../models')

const createActivity = async (name) => {
    try {
        const newActivity = {
            name : name
        }
        await ActivityModel.create(newActivity)
        return newActivity
    } catch (error) {
        throw(error)
    }
}



module.exports = {createActivity}