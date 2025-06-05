
const { UserModel } = require("../models");




const getAllUser = async () => {
  try {
    const users = await UserModel.findAll({ include: { all: true } });
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

module.exports = {  getAllUser, getUserById, editUser };
