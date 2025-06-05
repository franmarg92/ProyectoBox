const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');


const Enrollment = dbConfig.sequelize.define('Enrollment', {
    enrollment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    session_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Session',
            key: 'session_id'
        }
    },
    attended: {  // Nuevo campo para registrar asistencia
        type: DataTypes.BOOLEAN,
        defaultValue: false  // Se marca como `false` por defecto hasta que el usuario asista
    },
       enrollment_date: {  // Nuevo campo para registrar la fecha de inscripción
        type: DataTypes.DATEONLY,  // Solo almacena fecha sin hora
        allowNull: false,
        defaultValue: DataTypes.NOW  // Guarda la fecha de inscripción automáticamente
    }
  }, { timestamps: false });
  
  module.exports = Enrollment;