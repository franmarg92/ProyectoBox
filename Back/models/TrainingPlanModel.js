const {DataTypes} = require('sequelize')
const {dbConfig} = require('../config')
const UserModel = require('./UserModel')


const trainingPlanModel = dbConfig.sequelize.define("trainingPlan",{
    trainingPlan_id:{
         type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
     description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
     user_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'user_id'
        }
    },
}, {
    timestamps: false
})

module.exports = trainingPlanModel