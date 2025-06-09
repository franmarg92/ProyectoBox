const {ClassService} = require('../services')

const createSession = async (req, res) => {

    try {
        const sessionData = req.body;
        const newSession = await ClassService.createSession(sessionData)
        res.status(201).json({ message: 'Sesión creada exitosamente', session: newSession });
    } catch (error) {
       res.status(400).json({ error: error.message }); 
    }
    
}

const getSessionById = async (req, res, next) => {
    try {
        const id = req.params.id
        const findUser = await ClassService.getSessionById(id)
        res.status(200).json(findUser)
    } catch (error) {
        next(error)
    }
}

const getAllClass = async (req,res,next) => {
    try {
        const session = await ClassService.getAllClass();
        res.status(200).json(session);
    } catch (error) {
        next (error)
    }
    
}
module.exports ={ getAllClass ,createSession, getSessionById }