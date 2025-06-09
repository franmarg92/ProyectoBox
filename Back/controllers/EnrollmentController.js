const {enrollmentsService} = require ('../services')


const enrollUser = async (req, res) => {
    try {
        const {user_id, class_id} = req.body;
        const result = await enrollmentsService.enrollUser (user_id, class_id );
        res.status(201).json(result);
    } catch (error) {
         res.status(400).json({ error: error.message });
        }
    }



    module.exports = {enrollUser}
    
