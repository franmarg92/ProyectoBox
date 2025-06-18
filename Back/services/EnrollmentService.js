const EnrollmentsModel = require("../models/EnrollmentModel");
const SessionModel = require("../models/SessionModel");
const PaidModel = require("../models/PaidsModel");
const ActivityModel = require("../models/ActivityModel");
const DaysModel = require("../models/DaysModel");
const HoursModel = require("../models/HoursModel");
const UserModel = require('../models/UserModel')

const enrollUser = async (user_id, class_id, enrollment_date) => {
  // 🔹 Validar estado de pago
  const userPayment = await PaidModel.findOne({ where: { user_id } });

  if (!userPayment || !userPayment.is_paid || new Date() > userPayment.expiration_date) {
    throw new Error("El pago no es válido o ha expirado.");
  }

    // 🔹 Validar que no sea fecha pasada
  const today = new Date();
  today.setHours(0, 0, 0, 0); // día actual sin hora
  const asistenciaDate = new Date(enrollment_date + 'T00:00:00'); // evita desfase por zona horaria

  if (asistenciaDate < today) {
    throw new Error("No se puede inscribir a fechas pasadas.");
  }

  // 🔹 Buscar la sesión
  const session = await SessionModel.findOne({ where: { class_id } });

  if (!session) {
    throw new Error("La sesión seleccionada no existe.");
  }

  // 🔹 Verificar si ya está inscripto a la misma clase en esa fecha
  const yaInscripto = await EnrollmentsModel.findOne({
    where: {
      user_id,
      class_id,
      enrollment_date
    }
  });

  if (yaInscripto) {
    throw new Error("Ya estás inscripto a esta clase en esa fecha.");
  }

  // 🔹 Verificar si ya está inscripto a otra clase de la misma actividad ese día
  const inscriptoMismaActividad = await EnrollmentsModel.findOne({
    where: {
      user_id,
      enrollment_date
    },
    include: {
      model: SessionModel,
      where: {
        id_activity: session.id_activity
      }
    }
  });

  if (inscriptoMismaActividad) {
    throw new Error("Ya estás inscripto a esta actividad en esa fecha.");
  }

  // 🔹 Verificar cupos disponibles
  if (session.available_spots <= 0) {
    throw new Error("No hay cupos disponibles en esta clase.");
  }

  // 🔹 Registrar la inscripción
  await EnrollmentsModel.create({
    user_id,
    class_id,
    enrollment_date
  });

  // 🔹 Actualizar el cupo en la sesión
  session.available_spots -= 1;
  await session.save();

  return {
    message: `Inscripción confirmada para ${enrollment_date}`,
    session
  };
};


const getAllEnrollments = async () => {
  return await EnrollmentsModel.findAll({
    include: [
      {
        model: UserModel, // 🔹 Trae datos del usuario inscrito
        attributes: ["user_id", "name", "lastName"],
      },
      {
        model: SessionModel, // 🔹 Trae datos de la sesión
        include: [
          {
            model: ActivityModel, // 🔹 Tipo de clase
            attributes: ["name"],
          },
          {
            model: DaysModel, // 🔹 Día
            attributes: ["days"],
          },
          {
            model: HoursModel, // 🔹 Hora
            attributes: ["hour"],
          },
        ],
      },
    ],
  });
};

const getEnrollmentsByDate = async (dateString) => {
 if (!dateString || isNaN(Date.parse(dateString))) {
  throw new Error("Fecha inválida recibida.");
}
const date = new Date(`${dateString}T00:00:00`);
  const jsDay = date.getDay(); // 0 = domingo
  const id_day = jsDay === 0 ? 7 : jsDay;

  const sessions = await SessionModel.findAll({
    where: { id_day },
    
     include: [
      {
        model: EnrollmentsModel,
        where: { enrollment_date: dateString },
        required: false,
        include: [
          {
            model: UserModel,
            attributes: ['user_id', 'name', 'lastName', 'email'] // ajustá según lo que uses
          }
        ]
      },
      {
        model: ActivityModel
      },
      {
        model: HoursModel
      }
    ],
    order: [[HoursModel, 'hour', 'ASC']]
  });

  return sessions;
};

const registerAttendance = async (enrollmentIds) => {
  try {
    if (!Array.isArray(enrollmentIds) || enrollmentIds.length === 0) {
      console.log('Debe enviar un array de inscripciones válidas');
      return;
    }

    const attendance = await EnrollmentsModel.update(
      { attended: true },
      { where: { enrollment_id: enrollmentIds } }
    );

    console.log(`✅ Asistencia marcada para ${enrollmentIds.length} inscripción(es).`);
    return attendance;
  } catch (error) {
    console.error('❌ Error al registrar asistencia:', error);
    throw error;
  }
};

const classCounter = async () => {
  return await EnrollmentsModel.findAll({
    where: { attended: true },
    attributes: [
      'user_id',
      [fn('COUNT', col('enrollment_id')), 'total_asistencias']
    ],
    group: ['user_id', 'User.user_id'],
    include: [
      { model: UserModel, attributes: ['name', 'lastName'] }
    ]
  });
};

const activityCounter = async () => {
  return await EnrollmentsModel.findAll({
    where: { attended: true },
    attributes: [
      'user_id',
      [fn('COUNT', col('enrollment_id')), 'asistencias']
    ],
    group: [
      'user_id',
      'User.user_id',
      'Class.class_id',
      'Class.Activity.activity_id'
    ],
    include: [
      {
        model: UserModel,
        attributes: ['name', 'lastName']
      },
      {
        model: ClassModel,
        attributes: ['activity_id'],
        include: [{ model: ActivityModel, attributes: ['name'] }]
      }
    ]
  });
};


module.exports = { enrollUser, getAllEnrollments, getEnrollmentsByDate, registerAttendance, classCounter, activityCounter };
