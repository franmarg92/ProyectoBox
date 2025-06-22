const SessionModel = require('../models/SessionModel')
const ActivityModel = require('../models/ActivityModel');
const DaysModel = require('../models/DaysModel');
const HoursModel = require('../models/HoursModel');
const trainingPlanModel = require('../models/TrainingPlanModel');


const createSession = async (sessionData) => {
   try {
     const { id_activity, id_day, id_hour, available_spots, max_spots } = sessionData;

  const activityExists = await ActivityModel.findByPk(id_activity);
  const dayExists = await DaysModel.findByPk(id_day);
  const hourExists = await HoursModel.findByPk(id_hour);

  if (!activityExists || !dayExists || !hourExists) {
    throw new Error('Actividad, día u hora no válidos');
  }

  const newSession = await SessionModel.create({
    id_activity,
    id_day,
    id_hour,
    available_spots,
    max_spots
  });

  return newSession;
   } catch (error) {
    throw error 
   }
}

const updateSession = async (class_id, available_spots, is_available) => {
  try {
    const session = await SessionModel.findByPk(class_id);
    if (!session) throw new Error('Sesión no encontrada');

    if (available_spots != null) session.available_spots = available_spots;
    if (is_available != null) session.is_available = is_available;

    await session.save();
    return session;
  } catch (error) {
    throw error;
  }
};


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



module.exports = {createSession, getSessionById, getAllClass, updateSession}