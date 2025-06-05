const UserModel = require('./UserModel');
const RoleModel = require('./RoleModel');
const EnrollmentModel = require('./EnrollmentModel');
const MedicalFitModel = require('./MedicalFitModel');
const TeacherClassModel = require('./TeacherClassModel');
const ActivityModel = require('./ActivityModel');
const HoursModel = require('./HoursModel');
const DaysModel = require('./DaysModel');
const SessionModel = require('./SessionModel'); 

// ==========================
// 📌 Relaciones de Roles
// ==========================
RoleModel.hasMany(UserModel, { foreignKey: 'role_id' });
UserModel.belongsTo(RoleModel, { foreignKey: 'role_id' });



// ==========================
// 📌 Relaciones de User y Enrollment
// ==========================
UserModel.hasMany(EnrollmentModel, { foreignKey: 'user_id' });
EnrollmentModel.belongsTo(UserModel, { foreignKey: 'user_id' });

// ==========================
// 📌 Relaciones de Clase y Enrollment
// ==========================
SessionModel.hasMany(EnrollmentModel, { foreignKey: 'class_id' });
EnrollmentModel.belongsTo(SessionModel, { foreignKey: 'class_id' });



// ==========================
// 📌 Relaciones de ProfesorClase
// ==========================
UserModel.hasMany(TeacherClassModel, { foreignKey: 'user_id' });
TeacherClassModel.belongsTo(UserModel, { foreignKey: 'user_id' });

SessionModel.hasMany(TeacherClassModel, { foreignKey: 'class_id' });
TeacherClassModel.belongsTo(SessionModel, { foreignKey: 'class_id' });

// ==========================
// 📌 Relaciones de AptoMedico
// ==========================
UserModel.hasMany(MedicalFitModel, { foreignKey: 'user_id' });
MedicalFitModel.belongsTo(UserModel, { foreignKey: 'user_id' });

// ==========================
// 📌 Relaciones de Sesiones con Días y Horarios
// ==========================
DaysModel.hasMany(SessionModel, { foreignKey: 'id_day' });
SessionModel.belongsTo(DaysModel, { foreignKey: 'id_day' });

HoursModel.hasMany(SessionModel, { foreignKey: 'id_hour' });
SessionModel.belongsTo(HoursModel, { foreignKey: 'id_hour' });

ActivityModel.hasMany(SessionModel, { foreignKey: 'id_class_type' });
SessionModel.belongsTo(ActivityModel, { foreignKey: 'id_class_type' });



module.exports = {
  UserModel, 
  RoleModel,
  EnrollmentModel, 
  MedicalFitModel, 
  TeacherClassModel, 
  ActivityModel,
  HoursModel,
  DaysModel,
  SessionModel
};
