const {DataTypes} = require ('sequelize');
const {dbConfig} = require('../config')

const wodModel = dbConfig.sequelize.define("Wods",{
  wod_id: {
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
},{
    timestamps:true
})


module.exports = wodModel
