const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');




const medicalFit = dbConfig.sequelize.define('medicalFit', {
    medical_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    archivo_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_subida: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('vigente', 'vencido'),
      defaultValue: 'vigente'
    }
  }, { timestamps: false });
  
  module.exports = medicalFit;