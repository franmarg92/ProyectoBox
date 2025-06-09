const EnrollmentsModel = require("../models/EnrollmentModel");
const SessionModel = require("../models/SessionModel");
const PaidModel = require("../models/PaidsModel");
const ActivityModel = require("../models/ActivityModel");
const DaysModel = require("../models/DaysModel");
const HoursModel = require("../models/HoursModel");
const UserModel = require('../models/UserModel')

const enrollUser = async (user_id, class_id) => {
  // 🔹 Verificar estado de pago
  const userPayment = await PaidModel.findOne({ where: { user_id: user_id } });
  if (!userPayment || !userPayment.is_paid || new Date() > userPayment.expiration_date) {
    throw new Error("El pago no es válido o ha expirado.");
  }

  // 🔹 Buscar la sesión por `class_id`
  const session = await SessionModel.findOne({ where: { class_id } });

  if (!session) {
    throw new Error("La sesión seleccionada no existe.");
  }

  // 🔹 Validar cupos disponibles
  if (session.available_spots <= 0) {
    throw new Error("No hay cupos disponibles en esta clase.");
  }

  // 🔹 Registrar inscripción
  await EnrollmentsModel.create({ user_id, class_id });

  // 🔹 Reducir cupo en la sesión
  session.available_spots -= 1;
  await session.save();

  return { message: "Inscripción exitosa", session };
};


const getAllEnrollments = async () => {
  return await EnrollmentModel.findAll({
    include: [
      {
        model: UserModel, // 🔹 Trae datos del usuario inscrito
        attributes: ["user_id", "name", "email"],
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

module.exports = { enrollUser, getAllEnrollments };
