const express = require ('express')
const router = express.Router();
const {trainingPlanController} = require('../controllers')


router.post('/createPlan', trainingPlanController.createPlan)
router.put("/updatePlan/:trainingPlan_id", trainingPlanController.updatePlan)
router.get("/:user_id" , trainingPlanController.getPlanByUserId)

module.exports = router