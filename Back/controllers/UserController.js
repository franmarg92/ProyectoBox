const { UserService } = require ('../services')




const getAllUser = async (req, res, next) => {
    try {
        const users = await UserService.getAllUser();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
    
}

const editRole = async (req, res, next ) => {
    try {
    const { user_id, role } = req.body;
    const result = await UserService.editRole(user_id, role);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {  getAllUser, editRole}