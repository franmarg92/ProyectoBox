const {enrollmentsService} = require ('../services')


const enrollUser = async (req, res) => {
    try {
        const {user_id, class_id, enrollment_date} = req.body;
     
        const result = await enrollmentsService.enrollUser(user_id, class_id, enrollment_date)
        res.status(201).json(result);
    } catch (error) {
         console.error('⛔ Error en inscripción:', error);
res.status(400).json({ error: error.message || 'Error inesperado' });
        }
    }

    const getAllEnrollments = async (req, res, next ) => {
      try{
        const enrollments = await enrollmentsService.getAllEnrollments();
        res.status(200).json(enrollments)
      } catch(error){
        next(error)
      }
    }


const getEnrollmentsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Falta el parámetro 'date' en la query." });
    }

    const sessions = await enrollmentsService.getEnrollmentsByDate(date);
    res.status(200).json(sessions);
  } catch (error) {
    console.error("⛔ Error en getEnrollmentsByDate:", error);
    res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
};


const registerAttendance = async (req, res) => {
  try {
    const { enrollmentIds } = req.body;

    if (!Array.isArray(enrollmentIds) || enrollmentIds.length === 0) {
      return res.status(400).json({ error: 'Se esperaban IDs de inscripciones válidas.' });
    }

    const enroll = await enrollmentsService.registerAttendance(enrollmentIds);
    return res.status(200).json(enroll);
  } catch (error) {
    console.error('❌ Error en registrarAsistencia:', error);
    return res.status(500).json({ error: 'Error al registrar asistencia.' });
  }
};



    module.exports = {registerAttendance, enrollUser, getEnrollmentsByDate, getAllEnrollments }
    
