const express = require('express')
const router = express.Router()
const {classController} = require('../controllers')

router.post('/create', classController.createSession)
router.get('/:id', classController.getSessionById)
router.get('/', classController.getAllClass)
router.put('/updateSession/:class_id', classController.updateSession)

module.exports = router;