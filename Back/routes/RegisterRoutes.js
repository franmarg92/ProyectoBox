const express = require('express')
const router = express.Router()
const { registerController } = require('../controllers')


router.post('/', registerController.registerUser )


module.exports = router;