const {DataTypes} = require('sequelize');
const {dbConfig} = require('../config');
const UserModel = require('../models/UserModel')

const paids =dbConfig.sequelize.define('Paids', {
    id_paid: {
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
    is_paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false  
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: true  
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: true  
    },
    amount_paid: {  
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0  
    }
}, { timestamps: false });

module.exports =  paids

