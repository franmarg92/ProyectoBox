const express = require('express')
const router = express.Router()
const {hoursController} = require('../controllers')

router.get('/' , hoursController.getAllHours)

module.exports = router;