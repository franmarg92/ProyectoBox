const jwt = require("jsonwebtoken");
const {UserModel, RoleModel} = require('../models')
const {  checkPassword } = require("./hashPasswordService");
const JWT_SECRET = process.env.JWT_SECRET || 'clave_por_defecto';




const loginUser = async (email, password) => {
  try {
    const user = await UserModel.findOne({
      where: { email },
      include: {
        model: RoleModel,
        attributes: ["name"],
      },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordCorrect = await checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Contraseña incorrecta");
    }

    const tokenPayload = {
      user_id: user.user_id,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      role: user.Role.name.toLowerCase()
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "2h" });

    return {
      success: true,
      message: "Login exitoso desde el back",
      token,
      user: tokenPayload,
    };
  } catch (error) {
    throw error;
  }
};


module.exports = {loginUser}