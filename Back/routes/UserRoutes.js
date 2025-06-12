const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const {authMiddleware}  = require('../middlewares')

router.get("/", userController.getAllUser);
router.put(
  "/update-role",
  authMiddleware.userIsAuth,
  authMiddleware.userIsAdmin,
  userController.editRole
);

module.exports = router;
