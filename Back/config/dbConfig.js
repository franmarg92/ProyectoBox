const { Sequelize} = require ('sequelize');
require('dotenv').config()


const sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB__HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
})


const initDB = async () => {
    try {
        await sequelize.authenticate().then(
            console.log('Se conecto a la base de datos')
        )
        await sequelize.sync({force:false})
        
    } catch (error) {
        console.log('Error al conectarse a la base de datos', error)
    }
}

module.exports = {sequelize, initDB}