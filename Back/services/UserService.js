const { UserModel } = require("../models");
const userModel = require("../models/UserModel");

const getAllUser = async () => {
  try {
    const users = await UserModel.findAll({
      include: { all: true },
      order: [["name", "ASC"]],
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (user_id) => {
  try {
    const findUser = await UserModel.findByPk(user_id, {
      include: { all: true },
    });
    return findUser;
  } catch (error) {
    throw error;
  }
};

const editUser = async (id, user) => {
  try {
    await UserModel.update(user, {
      where: {
        user_id: id,
      },
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const editRole = async (user_id, role) => {
   try {
    // Verificar si el usuario existe
    const user = await UserModel.findOne({ where: { user_id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Validar que el nuevo rol sea válido
    if (!['Alumno', 'Profesor', 'Admin'].includes(role)) {
      throw new Error('Rol no válido');
    }

    // Actualizar el rol en la base de datos
    await UserModel.update({ role }, { where: { user_id } });

    return { success: true, message: 'Rol actualizado correctamente' };
  } catch (error) {
    throw new Error(error.message || 'Error interno del servidor');
  }
};


module.exports = { getAllUser, getUserById, editUser, editRole };
