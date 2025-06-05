const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');



const Attendance = dbConfig.sequelize.define('Attendance', {
    attendance_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    enrollment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, { timestamps: false });
  
  module.exports = Attendance;