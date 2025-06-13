const enrollmentsService = require("./EnrollmentService");
const RoleService = require("./RoleService");
const UserService = require("./UserService");
const loginService = require("./loginService");
const registerService = require("./registerUserService");
const ActivityTypeService = require("./ActivityTypeService");
const ClassService = require("./ClassService");
const HoursService = require("./HoursService");
const DaysService = require("./DaysService");
const PaidsService = require('./PaidsService')
const WodService = require('./WodService');


module.exports = {
  PaidsService,
  DaysService,
  HoursService,
  enrollmentsService,
  RoleService,
  UserService,
  loginService,
  registerService,
  ActivityTypeService,
  ClassService,
  WodService
};
