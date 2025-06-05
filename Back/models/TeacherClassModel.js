const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');


const teacherClass = dbConfig.sequelize.define('TeacherClass', {
    teacher_class_id: {
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
    }
  }, { timestamps: false });
  
  module.exports = teacherClass;