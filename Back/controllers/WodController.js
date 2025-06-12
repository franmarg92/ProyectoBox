const { WodService } = require("../services");
const  {WodModel} = require('../models')

const createWod = async (req, res, next) => {
  try {
    const { description } = req.body;
    const newDescripcion = await WodService.createWod(description);
    res.status(200).json(newDescripcion);
  } catch (error) {
    next(error);
  }
};

const updateWod = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!id || !description) {
      return res.status(400).json({ error: "ID y descripción son obligatorios" });
    }

    const wod = await WodModel.findByPk(id);
    if (!wod) {
      return res.status(404).json({ error: "WOD no encontrado" });
    }

    await wod.update({ description });
    res.json({ message: "WOD actualizado correctamente", wod });
  } catch (error) {
    console.error("❌ Error interno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getAllWods = async (req, res, next) => {
  try {
    const wods = await WodService.getAllWods();
    res.status(200).json(wods);
  } catch (error) {
    next(error);
  }
};

module.exports = { createWod, updateWod, getAllWods };
