const db = require("../config/db");

// Get all appointments for logged-in doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find doctor ID from logged-in user
    const doctorResult = await db.query(
      "SELECT id FROM doctors WHERE user_id = $1",
      [userId]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const doctorId = doctorResult.rows[0].id;

    const appointments = await db.query(
      `
      SELECT
        a.id,
        u.name AS patient_name,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status
      FROM appointments a
      JOIN users u
        ON a.patient_id = u.id
      WHERE a.doctor_id = $1
      ORDER BY a.appointment_date, a.appointment_time
      `,
      [doctorId]
    );

    res.json({
      appointments: appointments.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      `
      UPDATE appointments
      SET status = $1
      WHERE id = $2
      `,
      [status, id]
    );

    res.json({
      message: "Appointment updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};