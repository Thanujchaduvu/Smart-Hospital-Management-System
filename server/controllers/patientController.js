const pool = require("../config/db");

/*
=====================================
PATIENT DASHBOARD
=====================================
*/

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find patient id
    const patientResult = await pool.query(
      `SELECT id
       FROM patients
       WHERE user_id = $1`,
      [userId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const patientId = patientResult.rows[0].id;

    // Appointment Counts
    const appointmentResult = await pool.query(
      `
      SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status='Pending') AS pending,
      COUNT(*) FILTER (WHERE status='Confirmed') AS confirmed,
      COUNT(*) FILTER (WHERE status='Completed') AS completed

      FROM appointments
      WHERE patient_id=$1
      `,
      [patientId]
    );

    // Lab Reports Count
    const reportResult = await pool.query(
      `
      SELECT COUNT(*) AS reports
      FROM lab_reports lr
      JOIN lab_tests lt
      ON lr.test_id = lt.id
      WHERE lt.patient_id = $1
      `,
      [patientId]
    );

    // Bills Count
    const billResult = await pool.query(
      `
      SELECT COUNT(*) AS bills
      FROM bills
      WHERE patient_id=$1
      `,
      [patientId]
    );

    res.json({
      appointments: appointmentResult.rows[0],
      reports: reportResult.rows[0].reports,
      bills: billResult.rows[0].bills,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

/*
=====================================
GET MY APPOINTMENTS
=====================================
*/

exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get patient id
    const patientResult = await pool.query(
      `
      SELECT id
      FROM patients
      WHERE user_id = $1
      `,
      [userId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const patientId = patientResult.rows[0].id;

    // Fetch appointments with doctor details
    const appointments = await pool.query(
      `
      SELECT
        a.id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.reason,

        d.id AS doctor_id,

        u.name AS doctor_name,
        u.department

      FROM appointments a

      JOIN doctors d
        ON a.doctor_id = d.id

      JOIN users u
        ON d.user_id = u.id

      WHERE a.patient_id = $1

      ORDER BY a.appointment_date DESC,
               a.appointment_time DESC
      `,
      [patientId]
    );

    res.status(200).json({
      success: true,
      count: appointments.rows.length,
      appointments: appointments.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/*
=====================================
BOOK APPOINTMENT
=====================================
*/

exports.bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
    } = req.body;

    // Validation
    if (
      !doctor_id ||
      !appointment_date ||
      !appointment_time ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Get patient
    const patientResult = await pool.query(
      `
      SELECT id
      FROM patients
      WHERE user_id = $1
      `,
      [userId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const patientId = patientResult.rows[0].id;

    // Check doctor exists
    const doctorResult = await pool.query(
      `
      SELECT id
      FROM doctors
      WHERE id = $1
      `,
      [doctor_id]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Prevent duplicate booking
    const existingAppointment = await pool.query(
      `
      SELECT id
      FROM appointments
      WHERE doctor_id=$1
      AND appointment_date=$2
      AND appointment_time=$3
      `,
      [
        doctor_id,
        appointment_date,
        appointment_time,
      ]
    );

    if (existingAppointment.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Doctor already has an appointment at this time.",
      });
    }

    // Insert appointment
    const appointment = await pool.query(
      `
      INSERT INTO appointments
      (
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status,
        reason
      )

      VALUES
      ($1,$2,$3,$4,$5,$6)

      RETURNING *
      `,
      [
        patientId,
        doctor_id,
        appointment_date,
        appointment_time,
        "Pending",
        reason,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      appointment: appointment.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/*
=====================================
GET LAB REPORTS
=====================================
*/

exports.getLabReports = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get patient ID
    const patientResult = await pool.query(
      `
      SELECT id
      FROM patients
      WHERE user_id = $1
      `,
      [userId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const patientId = patientResult.rows[0].id;

    // Fetch lab reports
    const reports = await pool.query(
      `
      SELECT
        lt.id AS test_id,
        lt.test_name,
        lt.test_type,
        lt.status,

        lr.id AS report_id,
        lr.report_file,
        lr.result,
        lr.remarks,
        lr.uploaded_at,

        u.name AS doctor_name

      FROM lab_tests lt

      LEFT JOIN lab_reports lr
      ON lt.id = lr.test_id

      LEFT JOIN doctors d
      ON lt.doctor_id = d.id

      LEFT JOIN users u
      ON d.user_id = u.id

      WHERE lt.patient_id = $1

      ORDER BY lt.created_at DESC
      `,
      [patientId]
    );

    res.status(200).json({
      success: true,
      count: reports.rows.length,
      reports: reports.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/*
=====================================
GET PATIENT BILLS
=====================================
*/

exports.getBills = async (req, res) => {
  try {

    const userId = req.user.id;

    // Get Patient ID
    const patientResult = await pool.query(
      `
      SELECT id
      FROM patients
      WHERE user_id = $1
      `,
      [userId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const patientId = patientResult.rows[0].id;

    // Fetch Bills
    const bills = await pool.query(
      `
      SELECT

      b.id,
      b.invoice_number,
      b.amount,

      b.consultation_fee,
      b.lab_fee,
      b.medicine_fee,

      b.payment_status,
      b.payment_method,

      b.created_at,

      u.name AS doctor_name

      FROM bills b

      LEFT JOIN doctors d
      ON b.doctor_id = d.id

      LEFT JOIN users u
      ON d.user_id = u.id

      WHERE b.patient_id = $1

      ORDER BY b.created_at DESC
      `,
      [patientId]
    );

    res.status(200).json({
      success: true,
      count: bills.rows.length,
      bills: bills.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/*
=====================================
GET PATIENT PROFILE
=====================================
*/

exports.getProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const profile = await pool.query(
      `
      SELECT

      p.id,
      p.date_of_birth,
      p.gender,
      p.blood_group,
      p.address,
      p.phone,
      p.emergency_contact,

      u.name,
      u.email

      FROM patients p

      JOIN users u
      ON p.user_id = u.id

      WHERE p.user_id = $1
      `,
      [userId]
    );

    if (profile.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: profile.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/*
=====================================
UPDATE PATIENT PROFILE
=====================================
*/

exports.updateProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      name,
      phone,
      address,
      gender,
      blood_group,
      date_of_birth,
      emergency_contact,
    } = req.body;

    // Update users table
    await pool.query(
      `
      UPDATE users

      SET
      name = $1,
      email = email

      WHERE id = $2
      `,
      [
        name,
        userId,
      ]
    );

    // Update patients table
    const updated = await pool.query(
      `
      UPDATE patients

      SET

      phone = $1,
      address = $2,
      gender = $3,
      blood_group = $4,
      date_of_birth = $5,
      emergency_contact = $6

      WHERE user_id = $7

      RETURNING *
      `,
      [
        phone,
        address,
        gender,
        blood_group,
        date_of_birth,
        emergency_contact,
        userId,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      patient: updated.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/*
=====================================
GET PATIENT PRESCRIPTIONS
=====================================
*/

exports.getPrescriptions = async (req, res) => {
  try {

    const userId = req.user.id;

    // Get patient id
    const patientResult = await pool.query(
      `
      SELECT id
      FROM patients
      WHERE user_id = $1
      `,
      [userId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const patientId = patientResult.rows[0].id;

    const prescriptions = await pool.query(
      `
      SELECT

      p.id,

      p.medicine_name,
      p.dosage,
      p.frequency,
      p.duration,
      p.instructions,
      p.created_at,

      u.name AS doctor_name

      FROM prescriptions p

      LEFT JOIN doctors d
      ON p.doctor_id = d.id

      LEFT JOIN users u
      ON d.user_id = u.id

      WHERE p.patient_id = $1

      ORDER BY p.created_at DESC
      `,
      [patientId]
    );

    res.status(200).json({
      success: true,
      count: prescriptions.rows.length,
      prescriptions: prescriptions.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// =============================
// GET MEDICAL HISTORY
// =============================
exports.getMedicalHistory = async (req, res) => {
  try {
    const patientId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        a.id,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status,
        d.specialization,
        u.name AS doctor_name
      FROM appointments a
      JOIN doctors d
        ON a.doctor_id = d.id
      JOIN users u
        ON d.user_id = u.id
      WHERE a.patient_id = $1
      ORDER BY a.appointment_date DESC
      `,
      [patientId]
    );

    res.status(200).json({
      success: true,
      history: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medical history",
    });
  }
};


/*
=====================================
GET NOTIFICATIONS
=====================================
*/

exports.getNotifications = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      notifications: [],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};