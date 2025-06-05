const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');


const activity = dbConfig.sequelize.define('Activity', {
    id_activity: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { timestamps: false });
  
  module.exports = activity;