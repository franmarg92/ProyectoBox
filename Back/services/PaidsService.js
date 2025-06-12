const PaidModel = require("../models/PaidsModel");

const registerPayment = async (user_id, amount, months) => {
  try {
    let userPayment = await PaidModel.findOne({ where: { user_id } });

    let newExpirationDate = new Date();

    if (userPayment && userPayment.expiration_date) {
      newExpirationDate = new Date(userPayment.expiration_date);
    }

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

const getStatusPaid = async (user_id) => {
  try {
    const findPaid = await PaidModel.findOne({
      where: { user_id },
      order: [["expiration_date", "DESC"]],
      include: { all: true },
    });

    if (!findPaid) {
      return { is_paid: false, expiration_date: null };
    }

    const isActive = new Date(findPaid.expiration_date) > new Date();

    if (!isActive && findPaid.is_paid) {
      await findPaid.update({ is_paid: false });
    }

    return {
      user_id,
      is_paid: isActive,
      expiration_date: findPaid.expiration_date,
    };
  } catch (error) {
    throw error;
  }
};

const getALlPaids = async () => {
  try {
    const allPaids = await PaidModel.findAll({
      attributes: ["user_id", "expiration_date", "is_paid"],
      order: [["expiration_date", "DESC"]],
    });
    return allPaids;
  } catch (error) {
    throw error;
  }
};

module.exports = { registerPayment, getStatusPaid, getALlPaids  };
