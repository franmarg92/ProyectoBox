const { PaidsService } = require("../services");

const registerPayment = async (req, res, next) => {
  try {
    const { user_id, amount, months_paid } = req.body; 
    if (!user_id || !amount || !months_paid) {
      return res.status(400).json({ error: "Faltan parámetros en la solicitud." });
    }
    const newPayment = await PaidsService.registerPayment(user_id, amount, months_paid); // 🔹 Pasar months_paid
    return res.status(201).json({
      message: "Pago registrado exitosamente",
      newPayment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear el pago",
      error: error.errors || error.message,
    });
  }
};

const getStatusPaid = async (req,res,next) => {
  try {
    const { user_id } = req.params; 

    if (!user_id) {
      return res.status(400).json({ error: "Falta el parámetro user_id." });
    }
    const statusPaid = await PaidsService.getStatusPaid(user_id);
    res.status(200).json(statusPaid)
  } catch (error) {
    next (error)
  }
}

const getAllPaids = async (req, res, next) =>{
  try {
    const paids = await PaidsService.getALlPaids();
    res.status(200).json(paids)
  } catch (error) {
    next(error)
  }
}


module.exports = { registerPayment, getStatusPaid, getAllPaids };
