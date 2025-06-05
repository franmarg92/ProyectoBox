const { UserService } = require ('../services')




const getAllUser = async (req, res, next) => {
    try {
        const users = await UserService.getAllUser();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
    
}


module.exports = {  getAllUser}