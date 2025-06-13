const UserModel = require('./UserModel');
const RoleModel = require('./RoleModel');
const ActivityModel = require('./ActivityModel');
const HoursModel = require('./HoursModel');
const DaysModel = require('./DaysModel');
const SessionModel = require('./SessionModel'); 
const EnrollmentModel = require('./EnrollmentModel');
const TeacherClassModel = require('./TeacherClassModel');
const PaidModel = require('./PaidsModel');
const MedicalFitModel = require('./MedicalFitModel');
const WodModel = require('./WodModel');


// ==========================
// 📌 Relaciones de Roles
// ==========================
RoleModel.hasMany(UserModel, { foreignKey: 'role_id' });
UserModel.belongsTo(RoleModel, { foreignKey: 'role_id' });

// ==========================
// 📌 Relaciones con UserModel
// ==========================
UserModel.hasOne(PaidModel, { foreignKey: 'user_id' });
PaidModel.belongsTo(UserModel, { foreignKey: 'user_id' });

UserModel.hasMany(EnrollmentModel, { foreignKey: 'user_id' });
EnrollmentModel.belongsTo(UserModel, { foreignKey: 'user_id' });

UserModel.hasMany(TeacherClassModel, { foreignKey: 'user_id' });
TeacherClassModel.belongsTo(UserModel, { foreignKey: 'user_id' });

UserModel.hasMany(MedicalFitModel, { foreignKey: 'user_id' });
MedicalFitModel.belongsTo(UserModel, { foreignKey: 'user_id' });

// ==========================
// 📌 Relaciones de Sesiones con Actividades, Días y Horas
// ==========================
ActivityModel.hasMany(SessionModel, { foreignKey: 'id_activity' });
SessionModel.belongsTo(ActivityModel, { foreignKey: 'id_activity' });

DaysModel.hasMany(SessionModel, { foreignKey: 'id_day' });
SessionModel.belongsTo(DaysModel, { foreignKey: 'id_day' });

HoursModel.hasMany(SessionModel, { foreignKey: 'id_hour' });
SessionModel.belongsTo(HoursModel, { foreignKey: 'id_hour' });

// ==========================
// 📌 Relaciones de Enrollment con Clases
// ==========================
SessionModel.hasMany(EnrollmentModel, { foreignKey: 'class_id' });
EnrollmentModel.belongsTo(SessionModel, { foreignKey: 'class_id' });

// ==========================
// 📌 Relaciones de Profesor con Clases
// ==========================
SessionModel.hasMany(TeacherClassModel, { foreignKey: 'class_id' });
TeacherClassModel.belongsTo(SessionModel, { foreignKey: 'class_id' });



module.exports = {
  UserModel, 
  RoleModel,
  ActivityModel,
  HoursModel,
  DaysModel,
  SessionModel,
  EnrollmentModel, 
  TeacherClassModel, 
  PaidModel, 
  MedicalFitModel,
  WodModel
};
