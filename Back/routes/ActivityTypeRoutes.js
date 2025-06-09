const express = require('express');
const router = express.Router();
const {activityController} = require('../controllers');


router.get('/', activityController.getAllActivities)
router.post ('/create', activityController.createActivity)

module.exports = router;