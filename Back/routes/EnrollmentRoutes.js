const express = require('express')
const router = express.Router()
const {enrollController} = require('../controllers')

router.post('/enroll', enrollController.enrollUser)
router.get('/by-date', enrollController.getEnrollmentsByDate)
router.get('/', enrollController.getAllEnrollments)
router.patch('/attend', enrollController.registerAttendance);

module.exports = router;