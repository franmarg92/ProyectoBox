const cron = require('node-cron');
const { SessionModel } = require('../models');  
const { Op } = require('sequelize');
// 🔹 Ejecuta el reset de cupos a medianoche todos los días
cron.schedule('0 0 * * *', async () => {
    try {
        await SessionModel.update(
            { available_spots: SessionModel.available_spots },  
            { where: {} }  
        );
        console.log('✅ Cupos de sesiones restaurados correctamente.');
    } catch (error) {
        console.error('❌ Error al resetear cupos:', error);
    }
});




module.exports = cron;