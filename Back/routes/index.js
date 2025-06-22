const roleRouter = require("./RoleRoutes");
const userRouter = require("./UserRoutes");
const loginRouter = require("./LoginRoutes");
const registerRouter = require("./RegisterRoutes");
const activityRouter = require("./ActivityTypeRoutes");
const enrollRouter = require("./EnrollmentRoutes");
const hoursRouter = require("./HoursRoutes");
const daysRouter = require("./DaysRoutes");
const classRouter = require("./ClassRoutes");
const paidsRouter = require("./PaidsRoutes");
const wodRouter = require('./WodRoutes');
const trainingPlanRouter = require('./TrainingPlanRoutes')


module.exports = {
  paidsRouter,
  classRouter,
  daysRouter,
  hoursRouter,
  roleRouter,
  userRouter,
  loginRouter,
  registerRouter,
  activityRouter,
  enrollRouter,
  wodRouter,
  trainingPlanRouter
  
};
