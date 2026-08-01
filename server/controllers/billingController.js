const pool = require("../config/db");

// ==========================================
// GET ALL BILLS
// ==========================================

exports.getAllBills = async (req, res) => {
  try {
    const result = await pool.query(`
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

        p.name AS patient_name,
        duser.name AS doctor_name,
        a.appointment_date,
        a.appointment_time

      FROM bills b

      LEFT JOIN users p
        ON b.patient_id = p.id

      LEFT JOIN doctors d
        ON b.doctor_id = d.id

      LEFT JOIN users duser
        ON d.user_id = duser.id

      LEFT JOIN appointments a
        ON b.appointment_id = a.id

      ORDER BY b.created_at DESC
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bills",
    });
  }
};

// ==========================================
// GET BILL BY ID
// ==========================================

exports.getBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        b.*,

        p.name AS patient_name,
        p.email,

        duser.name AS doctor_name,

        a.appointment_date,
        a.appointment_time

      FROM bills b

      LEFT JOIN users p
        ON b.patient_id = p.id

      LEFT JOIN doctors d
        ON b.doctor_id = d.id

      LEFT JOIN users duser
        ON d.user_id = duser.id

      LEFT JOIN appointments a
        ON b.appointment_id = a.id

      WHERE b.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bill",
    });
  }
};

// ==========================================
// CREATE BILL
// ==========================================

exports.createBill = async (req, res) => {
  try {
    const {
      appointment_id,
      patient_id,
      doctor_id,
      amount,
      consultation_fee,
      lab_fee,
      medicine_fee,
      payment_method,
    } = req.body;

    const invoice_number =
      "INV-" + Date.now();

    const result = await pool.query(
      `
      INSERT INTO bills
      (
        appointment_id,
        patient_id,
        doctor_id,
        amount,
        consultation_fee,
        lab_fee,
        medicine_fee,
        payment_status,
        payment_method,
        invoice_number
      )

      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
      )

      RETURNING *
      `,
      [
        appointment_id,
        patient_id,
        doctor_id,
        amount,
        consultation_fee || 0,
        lab_fee || 0,
        medicine_fee || 0,
        "Pending",
        payment_method || null,
        invoice_number,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Bill created successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create bill",
    });
  }
};

// ==========================================
// UPDATE PAYMENT STATUS
// ==========================================

exports.updateBill = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      payment_status,
      payment_method,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE bills

      SET
        payment_status=$1,
        payment_method=$2

      WHERE id=$3

      RETURNING *
      `,
      [
        payment_status,
        payment_method,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    res.json({
      success: true,
      message: "Bill updated successfully",
      data: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update bill",
    });

  }
};

// ==========================================
// DELETE BILL
// ==========================================

exports.deleteBill = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM bills
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bill deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete bill",
    });
  }
};

// ==========================================
// BILLING SUMMARY
// ==========================================

exports.getBillingSummary = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT

        COUNT(*) AS total_bills,

        COALESCE(SUM(amount),0) AS total_revenue,

        COUNT(*) FILTER (
          WHERE payment_status='Paid'
        ) AS paid_bills,

        COUNT(*) FILTER (
          WHERE payment_status='Pending'
        ) AS pending_bills,

        COUNT(*) FILTER (
          WHERE payment_status='Cancelled'
        ) AS cancelled_bills

      FROM bills
    `);

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch billing summary",
    });

  }
};

// ==========================================
// MONTHLY REVENUE REPORT
// ==========================================

exports.getMonthlyRevenue = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT

        TO_CHAR(created_at,'Mon') AS month,

        EXTRACT(MONTH FROM created_at) AS month_no,

        COALESCE(SUM(amount),0) AS revenue

      FROM bills

      GROUP BY month, month_no

      ORDER BY month_no
    `);

    res.status(200).json({
      success: true,
      data: result.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch revenue report",
    });

  }
};

// ==========================================
// GET APPOINTMENTS AVAILABLE FOR BILLING
// ==========================================

exports.getAppointmentsForBilling = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.id,
        a.appointment_date,
        a.appointment_time,

        u.id AS patient_id,
        u.name AS patient_name,

        d.id AS doctor_id,
        du.name AS doctor_name

      FROM appointments a

      JOIN users u
        ON a.patient_id = u.id

      JOIN doctors d
        ON a.doctor_id = d.id

      JOIN users du
        ON d.user_id = du.id

      WHERE NOT EXISTS (
        SELECT 1
        FROM bills b
        WHERE b.appointment_id = a.id
      )

      ORDER BY a.appointment_date DESC;
    `);

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments.",
    });
  }
};