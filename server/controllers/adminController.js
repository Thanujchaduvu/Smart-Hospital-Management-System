const db = require("../config/db");
const bcrypt = require("bcryptjs");

// =========================================
// CREATE STAFF
// =========================================

exports.createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const allowedRoles = [
      "doctor",
      "nurse",
      "receptionist",
      "laboratory",
      "pharmacy",
      "accountant",
      "admin",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role.",
      });
    }

    const existing = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `
      INSERT INTO users(name,email,password,role)
      VALUES($1,$2,$3,$4)
      RETURNING id,name,email,role
      `,
      [
        name,
        email,
        hashedPassword,
        role,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Staff created successfully.",
      staff: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// GET ALL STAFF
// =========================================

exports.getAllStaff = async (req, res) => {
  try {

    const result = await db.query(
      `
      SELECT id,name,email,role
      FROM users
      WHERE role != 'patient'
      ORDER BY id
      `
    );

    res.json({
      success: true,
      count: result.rows.length,
      staff: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// GET STAFF
// =========================================

exports.getStaffById = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await db.query(
      `
      SELECT id,name,email,role
      FROM users
      WHERE id=$1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.json({
      success: true,
      staff: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// UPDATE STAFF
// =========================================

exports.updateStaff = async (req, res) => {

  try {

    const { id } = req.params;
    const { name, email, role } = req.body;

    const result = await db.query(
      `
      UPDATE users
      SET
      name=$1,
      email=$2,
      role=$3
      WHERE id=$4
      RETURNING id,name,email,role
      `,
      [
        name,
        email,
        role,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.json({
      success: true,
      message: "Staff updated successfully.",
      staff: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// DELETE STAFF
// =========================================

exports.deleteStaff = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM users WHERE id=$1",
      [id]
    );

    res.json({
      success: true,
      message: "Staff deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// DASHBOARD STATS
// =========================================

exports.dashboardStats = async (req, res) => {

  try {

    const totalPatients = await db.query(
      "SELECT COUNT(*) FROM users WHERE role='patient'"
    );

    const totalDoctors = await db.query(
      "SELECT COUNT(*) FROM users WHERE role='doctor'"
    );

    const totalStaff = await db.query(
      "SELECT COUNT(*) FROM users WHERE role!='patient'"
    );

    res.json({
      success: true,
      stats: {
        patients: Number(totalPatients.rows[0].count),
        doctors: Number(totalDoctors.rows[0].count),
        staff: Number(totalStaff.rows[0].count),
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};