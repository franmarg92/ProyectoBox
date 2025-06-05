const UserModel = require ('./UserModel')
const RoleModel = require('./RoleModel')
const AttendanceModel = require('./AttendanceModel')
const ClassModel = require('./ClassModel')
const EnrollmentModel = require('./EnrollmentModel')
const MedicalFitModel = require('./MedicalFitModel')
const TeacherClassModel = require('./TeacherClassModel')
const ActivityModel = require('./ActivityModel')



// ==========================
// 📌 Relaciones de Roles
// ==========================
RoleModel.hasMany(UserModel, { foreignKey: 'role_id' });
UserModel.belongsTo(RoleModel, { foreignKey: 'role_id' });

// ==========================
// 📌 Relaciones de TipoClase y Clase
// ==========================
ActivityModel.hasMany(ClassModel, { foreignKey: 'id_class_type' });
ClassModel.belongsTo(ActivityModel, { foreignKey: 'id_class_type' });

// ==========================
// 📌 Relaciones de User y Enrollment
// ==========================
UserModel.hasMany(EnrollmentModel, { foreignKey: 'user_id' });
EnrollmentModel.belongsTo(UserModel, { foreignKey: 'user_id' });

// ==========================
// 📌 Relaciones de Clase y Enrollment
// ==========================
ClassModel.hasMany(EnrollmentModel, { foreignKey: 'class_id' });
EnrollmentModel.belongsTo(ClassModel, { foreignKey: 'class_id' });

// ==========================
// 📌 Relaciones de Enrollment y Attendance
// ==========================
EnrollmentModel.hasMany(AttendanceModel, { foreignKey: 'enrollment_id' });
AttendanceModel.belongsTo(EnrollmentModel, { foreignKey: 'enrollment_id' });

// ==========================
// 📌 Relaciones de ProfesorClase
// ==========================
UserModel.hasMany(TeacherClassModel, { foreignKey: 'user_id' });
TeacherClassModel.belongsTo(UserModel, { foreignKey: 'user_id' });

ClassModel.hasMany(TeacherClassModel, { foreignKey: 'class_id' });
TeacherClassModel.belongsTo(ClassModel, { foreignKey: 'class_id' });

// ==========================
// 📌 Relaciones de AptoMedico
// ==========================
UserModel.hasMany(MedicalFitModel, { foreignKey: 'user_id' });
MedicalFitModel.belongsTo(UserModel, { foreignKey: 'user_id' });


module.exports = {UserModel, RoleModel, AttendanceModel, ClassModel, EnrollmentModel, MedicalFitModel, TeacherClassModel, ActivityModel}