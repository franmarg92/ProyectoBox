const express = require('express');
const router = express.Router();
const {activityController} = require('../controllers');



router.post ('/create', activityController.createActivity)

module.exports = router;