const {DataTypes} = require ('sequelize');
const {dbConfig} = require('../config');

const hours = dbConfig.sequelize.define('Hours',
    {
        hours_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false
        }
    }, { timestamps: false}
);

module.exports = hours;