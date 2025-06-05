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
      allowNull: false
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  
  module.exports = Enrollment;