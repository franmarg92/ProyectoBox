const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');
const UserModel = require('./UserModel')
const SessionModel = require ('./SessionModel.js')


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
            model: UserModel,
            key: 'user_id'
        }
    },
    class_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SessionModel,
            key: 'class_id'
        }
    }
  }, { timestamps: false });
  
  module.exports = teacherClass;