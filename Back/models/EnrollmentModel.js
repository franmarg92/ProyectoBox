const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');
const UserModel = require('./UserModel')
const SessionModel = require ('./SessionModel.js')


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
    },
    attended: {  
        type: DataTypes.BOOLEAN,
        defaultValue: false  
    },
       enrollment_date: {  
        type: DataTypes.DATEONLY,  
        allowNull: false
    }
  }, { timestamps: false });
  
  module.exports = Enrollment;