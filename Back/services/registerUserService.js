const { UserModel, RoleModel } = require("../models");
const { hashPassword } = require("./hashPasswordService");

const registerUser = async (
  name,
  lastName,
  dni,
  date_of_birth,
  email,
  password,
  role_id
) => {
  try {
    const role = await RoleModel.findOne({ where: { name: "Alumno" } });
    if (!role) throw new Error("Rol por defecto no encontrado");
    const newUser = {
      name: name,
      lastName: lastName,
      dni: dni,
      date_of_birth: date_of_birth,
      email: email,
      password: await hashPassword(password),
      is_active: false,
      role_id: role.role_id,
    };
    const createdUser = await UserModel.create(newUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {registerUser}