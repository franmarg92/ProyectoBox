const enrollController = require("./EnrollmentController");
const roleController = require("./RoleController");
const userController = require("./UserController");
const loginController = require("./loginController");
const registerController = require("./registerController");
const activityController = require("./ActivityTypeController");
const classController = require("./ClassController");
const hoursController = require("./HoursController");
const daysController = require("./DaysController");
const paidsController = require("./PaidsController");
const wodController = require('./WodController')

module.exports = {
  paidsController,
  daysController,
  hoursController,
  enrollController,
  classController,
  activityController,
  roleController,
  userController,
  loginController,
  registerController,
  wodController
};
