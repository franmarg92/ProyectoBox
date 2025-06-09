const SessionModel = require('../models/SessionModel')
const ActivityModel = require('../models/ActivityModel');
const DaysModel = require('../models/DaysModel');
const HoursModel = require('../models/HoursModel');


const createSession = async (sessionData) => {
    const { id_activity, id_day, id_hour, available_spots, max_spots} = sessionData;

    const activityExists = await ActivityModel.findByPk(id_activity)
    const dayExists = await DaysModel.findByPk(id_day);
    const hourExists = await HoursModel.findByPk(id_hour);

    if (!activityExists || !dayExists || !hourExists){
        throw new error('Actividad, dia u hora no validos')
    }

    const newSession = await SessionModel.create({
        id_activity, id_day, id_hour, available_spots, max_spots
    })

    return newSession
}

const getSessionById = async (class_id) => {
    try {
        const findUser = await SessionModel.findByPk(class_id,{include: {all:true}})
        if(!findUser){
            const error = new Error()
            error.message = `Error al encontrar usuario con id=${user_id}`
            error.statusCode = 404
            throw error
        }
        return findUser
    } catch (error) {
        throw error
    }
    
}

const getAllClass = async () => {
    try {
        const sesions  = await SessionModel.findAll({include: {all:true}})
        return sesions
    } catch (error) {
        throw error
    }
    
}



module.exports = {createSession, getSessionById, getAllClass}