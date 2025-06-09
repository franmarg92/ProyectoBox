const express = require('express')
const router = express.Router();
const {daysController} = require('../controllers')

router.get('/', daysController.getAllDays)

module.exports = router;