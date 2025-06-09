const express = require('express')
const router = express.Router()
const {classController} = require('../controllers')

router.post('/create', classController.createSession)
router.get('/:id', classController.getSessionById)
router.get('/', classController.getAllClass)

module.exports = router;