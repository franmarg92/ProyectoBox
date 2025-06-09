const { DataTypes } = require('sequelize');
const { dbConfig } = require('../config');
const ActivityModel = require('./ActivityModel');  
const DaysModel = require('./DaysModel');
const HoursModel = require('./HoursModel');

const Session = dbConfig.sequelize.define('Session', {
    class_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_activity: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ActivityModel, 
            key: 'id_activity'
        }
    },
    id_day: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: DaysModel,
            key: 'days_id'
        }
    },
    id_hour: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: HoursModel,
            key: 'hours_id'
        }
    },
    available_spots: {  
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_spots: {  
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_available: {  
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, { timestamps: false });

// Exportar el modelo correctamente
module.exports = Session;
