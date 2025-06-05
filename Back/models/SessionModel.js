const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');


const session = dbConfig.sequelize.define('Session', {
    class_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_class_type: {  // Relación con la tabla de tipos de clase
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Activity',
            key: 'id_activity'
        }
    },
    id_day: {  // Relación con la tabla Days
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Days',
            key: 'days_id'
        }
    },
    id_hour: {  // Relación con la tabla Hours
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Hours',
            key: 'hours_id'
        }
    },
      available_spots: {  // Cupos restantes en la clase
        type: DataTypes.INTEGER,
        allowNull: false
    },
      max_spots: {  // Cupos maximo en la clase
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_available: {  // Estado de la clase (activo/inactivo)
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
  }, { timestamps: false });
  
  module.exports = session;