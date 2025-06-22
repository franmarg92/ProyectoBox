const trainingPlanModel = require ('../models/TrainingPlanModel')


const createPlan = async (user_id, description) => {
    try {
        if (!user_id || !description) throw new Error('Faltan datos');
        const trainingPlan = {
            user_id: user_id,
            description : description
        };
        await trainingPlanModel.create(trainingPlan)
        return trainingPlan
    } catch (error) {
        throw error
    }
}

const updatePlan = async ({ trainingPlan_id, user_id, description }) => {

    try {
         const plan = await trainingPlanModel.findByPk(trainingPlan_id);
  if (!plan) throw new Error('Plan no encontrado');

  plan.user_id = user_id || plan.user_id;
  plan.description = description || plan.description;

  await plan.save();

  return plan;
    } catch (error) {
        throw error
    }
  
};

const getPlanByUserId = async (user_id) => {
    try {
        const planById = await trainingPlanModel.findOne({
      where: { user_id }
    });
        return planById
    } catch (error) {
        throw error
    }
}


module.exports = {createPlan, updatePlan, getPlanByUserId}