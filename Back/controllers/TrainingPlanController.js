const {TrainingPlanService} = require('../services')
const {TrainingPlanModel} = require('../models')

const createPlan = async (req, res, next) => {
    try {
       const {user_id, description} = req.body;
       const newPlan  = await TrainingPlanService.createPlan (user_id, description)
       res.status(200).json(newPlan) 
    } catch (error) {
       next(error) 
    }
}


const updatePlan = async (req, res, next) => {
  try {
    const { trainingPlan_id } = req.params;
    const { user_id, description } = req.body;

    const updatedPlan = await TrainingPlanService.updatePlan({
      trainingPlan_id,
      user_id,
      description
    });

    res.status(200).json(updatedPlan);
  } catch (error) {
    next(error);
  }
};

const getPlanByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const plan = await TrainingPlanService.getPlanByUserId(user_id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado' });
    }

    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};


module.exports = {createPlan, updatePlan, getPlanByUserId}