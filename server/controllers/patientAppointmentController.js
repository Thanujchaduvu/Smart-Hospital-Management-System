const db = require("../config/db");

// Patient books an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;

    const {
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
    } = req.body;

    if (
      !doctor_id ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const result = await db.query(
      `
      INSERT INTO appointments
      (
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
        status
      )
      VALUES
      ($1,$2,$3,$4,$5,'Pending')
      RETURNING *;
      `,
      [
        patientId,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      appointment: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get logged-in patient's appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const result = await db.query(
      `
      SELECT
        a.id,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status,
        d.id AS doctor_id,
        u.name AS doctor_name,
        dep.name AS department
      FROM appointments a
      JOIN doctors d
        ON a.doctor_id = d.id
      JOIN users u
        ON d.user_id = u.id
      LEFT JOIN departments dep
        ON d.department_id = dep.id
      WHERE a.patient_id = $1
      ORDER BY a.appointment_date DESC, a.appointment_time DESC;
      `,
      [patientId]
    );

    res.status(200).json({
      success: true,
      appointments: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};