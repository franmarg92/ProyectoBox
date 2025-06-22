const { ClassService } = require("../services");

const createSession = async (req, res) => {
  try {
    const sessionData = req.body;
    const newSession = await ClassService.createSession(sessionData);
    res
      .status(201)
      .json({ message: "Sesión creada exitosamente", session: newSession });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSession = async (req, res, next) => {
  try {
    const class_id = parseInt(req.params.class_id, 10);
    if (isNaN(class_id)) {
      return res.status(400).json({ message: "ID de actividad inválido" });
    }
    const { available_spots, is_available } = req.body;

    const updatedSession = await ClassService.updateSession({
      id_activity,
      available_spots,
      is_available,
    });

    res.status(200).json(updatedSession);
  } catch (error) {
    next(error);
  }
};

const getSessionById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findUser = await ClassService.getSessionById(id);
    res.status(200).json(findUser);
  } catch (error) {
    next(error);
  }
};

const getAllClass = async (req, res, next) => {
  try {
    const session = await ClassService.getAllClass();
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllClass, createSession, getSessionById, updateSession };
