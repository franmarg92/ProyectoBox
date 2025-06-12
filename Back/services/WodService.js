const { WodModel } = require("../models");
const wodModel = require("../models/WodModel");

const createWod = async (description) => {
  try {
    const wod = {
      description: description,
    };
    await WodModel.create(wod);
    return wod;
  } catch (error) {
    throw error;
  }
};

const updateWod = async (newDescripcion) => {
  try {
    let wod = await WodModel.findOne({ where: { id: 1 } });

    await wod.update({ descripcion: newDescripcion });

    return { message: "WOD actualizado correctamente", wod };
  } catch (error) {
    throw error;
  }
};

const getAllWods = async () => {
  try {
    const wods = await wodModel.findAll({include:{all:true}})
    return wods
  } catch (error) {
    throw error
  }
  
}

module.exports = { createWod, updateWod, getAllWods };
