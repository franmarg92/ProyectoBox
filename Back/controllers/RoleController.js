const { RoleService } = require("../services");

const createRole = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newRole = await RoleService.createRole(name);
    res.status(200).json(newRole);
  } catch (error) {
    next(error);
  }
};

module.exports = { createRole };
