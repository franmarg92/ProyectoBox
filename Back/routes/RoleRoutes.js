const express = require('express');
const router = express.Router();
const {roleController} = require ('../controllers')


router.post('/create', roleController.createRole )

module.exports = router;
