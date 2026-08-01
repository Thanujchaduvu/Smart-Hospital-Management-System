const db = require("../config/db");

exports.getAppointments = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        a.id,
        u.name AS patient_name,
        duser.name AS doctor_name,
        dep.name AS department,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status
      FROM appointments a
      JOIN users u
        ON a.patient_id = u.id
      JOIN doctors d
        ON a.doctor_id = d.id
      JOIN users duser
        ON d.user_id = duser.id
      LEFT JOIN departments dep
        ON d.department_id = dep.id
      ORDER BY a.appointment_date DESC, a.appointment_time DESC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
    } = req.body;

    const result = await db.query(
      `
      INSERT INTO appointments
      (
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason
      )
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING *;
      `,
      [
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
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

// Update Appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
      status,
    } = req.body;

    const result = await db.query(
      `
      UPDATE appointments
      SET
        patient_id = $1,
        doctor_id = $2,
        appointment_date = $3,
        appointment_time = $4,
        reason = $5,
        status = $6
      WHERE id = $7
      RETURNING *;
      `,
      [
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
        status,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment updated successfully",
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

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM appointments WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};