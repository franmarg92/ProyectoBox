const express = require('express')
 const router = express.Router()
const {paidsController} = require('../controllers')
const {authMiddleware}  = require('../middlewares')


router.post(
  '/register',
 authMiddleware.userIsAuth, authMiddleware.userIsAdmin,
  paidsController.registerPayment
);
module.exports = router