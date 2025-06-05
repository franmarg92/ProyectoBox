const { loginService } = require ('../services')


const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const loginResponse = await loginService.loginUser(email, password)
        res.status(200).json(loginResponse)
    } catch (error) {
        next (error)
    }
    
}


module.exports = {loginUser}