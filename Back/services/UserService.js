const { UserModel } = require("../models");
const {RoleModel} = require ('../models')

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

const editRole = async (user_id, roleName) => {
  try {
    // Verificar si el usuario existe
    const user = await UserModel.findByPk(user_id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Buscar el rol por nombre (con capitalización tolerante)
    const normalizedName = roleName.charAt(0).toUpperCase() + roleName.slice(1).toLowerCase();

    const role = await RoleModel.findOne({ where: { name: normalizedName } });
    if (!role) {
      throw new Error('Rol no válido');
    }

    // Actualizar el rol del usuario
    await user.update({ role_id: role.role_id });

    return {
      success: true,
      message: `Rol actualizado a ${role.name} correctamente`,
      updatedRoleId: role.role_id
    };
  } catch (error) {
    throw new Error(error.message || 'Error interno del servidor');
  }
};


module.exports = { getAllUser, getUserById, editUser, editRole };
