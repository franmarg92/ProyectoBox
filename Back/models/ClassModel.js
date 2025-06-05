const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');


const session = dbConfig.sequelize.define('Session', {
    class_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    id_class_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ClassType',
        key: 'id_class_type'
      }}
  }, { timestamps: false });
  
  module.exports = session;