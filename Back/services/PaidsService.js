const PaidModel = require('../models/PaidsModel')


const registerPayment = async (user_id, amount, months = 1) => {
  try {
   
    let userPayment = await PaidModel.findOne({ where: { user_id } });

    
    const newExpirationDate = new Date();
    newExpirationDate.setMonth(newExpirationDate.getMonth() + months);

    if (!userPayment) {
      
      userPayment = await PaidModel.create({
        user_id,
        is_paid: true,
        payment_date: new Date(),
        expiration_date: newExpirationDate, 
        amount_paid: amount,
      });
    } else {
     
      await userPayment.update({
        is_paid: true,
        payment_date: new Date(),
        expiration_date: newExpirationDate, 
        amount_paid: amount,
      });
    }

    return { message: "Pago registrado correctamente", userPayment };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerPayment };
