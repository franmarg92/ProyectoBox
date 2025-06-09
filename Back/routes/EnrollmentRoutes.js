const express = require('express')
const router = express.Router()
const {enrollController} = require('../controllers')

router.post('/enroll', enrollController.enrollUser)

module.exports = router;