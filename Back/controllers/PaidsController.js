const { PaidsService } = require("../services");

const registerPayment = async (req, res, next) => {
  try {
    const { user_id, amount } = req.body;
    if (!user_id || !amount) {
      return res
        .status(400)
        .json({ error: "Faltan parámetros en la solicitud." });
    }
    const newPayment = await PaidsService.registerPayment(user_id, amount);
    return res.status(201).json({
      message: "Pago registrado exitosamente",
      newPayment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al crear el pago",
        error: error.errors || error.message,
      });
  }
};

module.exports = { registerPayment };
