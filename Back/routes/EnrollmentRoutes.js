const express = require('express')
const router = express.Router()
const {enrollController} = require('../controllers')

router.post('/enroll', enrollController.enrollUser)
router.get('/by-date', enrollController.getEnrollmentsByDate)
router.get('/', enrollController.getAllEnrollments)
router.patch('/attend', enrollController.registerAttendance);
router.get('/class-counter', enrollController.classCounter);
router.get('/activity-counter', enrollController.activityCounter);

module.exports = router;