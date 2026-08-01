const db = require("../config/db");
const bcrypt = require("bcryptjs");

// ========================================
// GET ALL PHARMACY STAFF
// ========================================

exports.getPharmacyStaff = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        p.id,
        p.employee_id,
        p.qualification,
        p.experience,
        p.phone,
        u.name,
        u.email
      FROM pharmacies p
      JOIN users u
      ON p.user_id = u.id
      ORDER BY u.name;
    `);

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pharmacy staff",
    });

  }
};

// ========================================
// GET SINGLE PHARMACY STAFF
// ========================================

exports.getPharmacyStaffById = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await db.query(
      `
      SELECT
        p.*,
        u.name,
        u.email
      FROM pharmacies p
      JOIN users u
      ON p.user_id = u.id
      WHERE p.id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy staff not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ========================================
// ADD PHARMACY STAFF
// ========================================

exports.addPharmacyStaff = async (req, res) => {

  const client = await db.connect();

  try {

    await client.query("BEGIN");

    const {
      name,
      email,
      password,
      employee_id,
      qualification,
      experience,
      phone,
    } = req.body;

    // Check email
    const emailExists = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (emailExists.rows.length > 0) {

      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });

    }

    // Check employee id
    const employeeExists = await client.query(
      "SELECT id FROM pharmacies WHERE employee_id = $1",
      [employee_id]
    );

    if (employeeExists.rows.length > 0) {

      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: "Employee ID already exists",
      });

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userResult = await client.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        role
      )
      VALUES
      ($1,$2,$3,'pharmacy')
      RETURNING id;
      `,
      [
        name,
        email,
        hashedPassword,
      ]
    );

    const userId = userResult.rows[0].id;

    // Create pharmacy staff
    const pharmacyResult = await client.query(
      `
      INSERT INTO pharmacies
      (
        user_id,
        employee_id,
        qualification,
        experience,
        phone
      )
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING *;
      `,
      [
        userId,
        employee_id,
        qualification,
        experience,
        phone,
      ]
    );

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Pharmacy staff added successfully",
      data: pharmacyResult.rows[0],
    });

  } catch (err) {

    await client.query("ROLLBACK");

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  } finally {

    client.release();

  }

};

// ========================================
// UPDATE PHARMACY STAFF
// ========================================

exports.updatePharmacyStaff = async (req, res) => {

  const client = await db.connect();

  try {

    await client.query("BEGIN");

    const { id } = req.params;

    const {
      name,
      email,
      employee_id,
      qualification,
      experience,
      phone,
    } = req.body;

    // Check pharmacy staff exists
    const pharmacy = await client.query(
      `
      SELECT user_id
      FROM pharmacies
      WHERE id = $1;
      `,
      [id]
    );

    if (pharmacy.rows.length === 0) {

      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Pharmacy staff not found",
      });

    }

    const userId = pharmacy.rows[0].user_id;

    // Update users table
    await client.query(
      `
      UPDATE users
      SET
        name = $1,
        email = $2
      WHERE id = $3;
      `,
      [
        name,
        email,
        userId,
      ]
    );

    // Update pharmacy table
    const result = await client.query(
      `
      UPDATE pharmacies
      SET
        employee_id = $1,
        qualification = $2,
        experience = $3,
        phone = $4
      WHERE id = $5
      RETURNING *;
      `,
      [
        employee_id,
        qualification,
        experience,
        phone,
        id,
      ]
    );

    await client.query("COMMIT");

    res.json({
      success: true,
      message: "Pharmacy staff updated successfully",
      data: result.rows[0],
    });

  } catch (err) {

    await client.query("ROLLBACK");

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  } finally {

    client.release();

  }

};

// ========================================
// DELETE PHARMACY STAFF
// ========================================

exports.deletePharmacyStaff = async (req, res) => {

  try {

    const { id } = req.params;

    const pharmacy = await db.query(
      `
      SELECT user_id
      FROM pharmacies
      WHERE id = $1;
      `,
      [id]
    );

    if (pharmacy.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Pharmacy staff not found",
      });

    }

    // Delete user (CASCADE removes pharmacy record)
    await db.query(
      `
      DELETE FROM users
      WHERE id = $1;
      `,
      [pharmacy.rows[0].user_id]
    );

    res.json({
      success: true,
      message: "Pharmacy staff deleted successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};