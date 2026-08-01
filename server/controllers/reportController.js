const db = require("../config/db");

// Dashboard Summary
exports.getSummary = async (req, res) => {
  try {
    const [
      doctors,
      patients,
      departments,
      appointments,
      completed,
      pending,
      cancelled,
    ] = await Promise.all([
      db.query("SELECT COUNT(*) FROM doctors"),
      db.query("SELECT COUNT(*) FROM users WHERE role='patient'"),
      db.query("SELECT COUNT(*) FROM departments"),
      db.query("SELECT COUNT(*) FROM appointments"),
      db.query("SELECT COUNT(*) FROM appointments WHERE status='Completed'"),
      db.query("SELECT COUNT(*) FROM appointments WHERE status='Pending'"),
      db.query("SELECT COUNT(*) FROM appointments WHERE status='Cancelled'"),
    ]);

    res.json({
      success: true,
      summary: {
        totalDoctors: Number(doctors.rows[0].count),
        totalPatients: Number(patients.rows[0].count),
        totalDepartments: Number(departments.rows[0].count),
        totalAppointments: Number(appointments.rows[0].count),
        completed: Number(completed.rows[0].count),
        pending: Number(pending.rows[0].count),
        cancelled: Number(cancelled.rows[0].count),
      },
    });
  } catch (err) {
    console.error("Summary Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Appointment Status Report
exports.getStatusReport = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        status,
        COUNT(*) AS count
      FROM appointments
      GROUP BY status
      ORDER BY status;
    `);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Appointments by Department
exports.getDepartmentReport = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        dep.name AS department,
        COUNT(a.id) AS appointments
      FROM departments dep
      LEFT JOIN doctors d
        ON dep.id = d.department_id
      LEFT JOIN appointments a
        ON d.id = a.doctor_id
      GROUP BY dep.name
      ORDER BY dep.name;
    `);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Monthly Appointment Report
exports.getMonthlyReport = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        TO_CHAR(appointment_date, 'Mon') AS month,
        EXTRACT(MONTH FROM appointment_date) AS month_no,
        COUNT(*) AS appointments
      FROM appointments
      GROUP BY month, month_no
      ORDER BY month_no;
    `);

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Recent Appointments
exports.getRecentAppointments = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        a.id,
        u.name AS patient,
        du.name AS doctor,
        dep.name AS department,
        a.appointment_date,
        a.appointment_time,
        a.status
      FROM appointments a
      JOIN users u
        ON a.patient_id = u.id
      JOIN doctors d
        ON a.doctor_id = d.id
      JOIN users du
        ON d.user_id = du.id
      LEFT JOIN departments dep
        ON d.department_id = dep.id
      ORDER BY a.appointment_date DESC,
               a.appointment_time DESC
      LIMIT 10;
    `);

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};