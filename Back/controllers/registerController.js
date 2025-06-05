const { registerService } = require ('../services')

const registerUser = async (req, res, next) => {
    const { name, lastName, dni, date_of_birth, email, password } = req.body;
    try {
        const newUser = await registerService.registerUser(name, lastName, dni, date_of_birth, email, password)
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            newUser
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el usuario", error: error.errors || error.message });

    }
}

module.exports ={registerUser}