const {DataTypes} = require ('sequelize');
const {dbConfig} = require('../config');

const days = dbConfig.sequelize.define('Days',
    {
        days_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        days: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false}
);

module.exports = days;