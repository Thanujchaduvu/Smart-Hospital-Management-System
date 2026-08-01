const db = require("../config/db");

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        d.id,
        d.department_id,
        u.name,
        u.email,
        dep.name AS department,
        d.specialization,
        d.qualification,
        d.experience
      FROM doctors d
      JOIN users u ON d.user_id = u.id
      LEFT JOIN departments dep
      ON dep.id = d.department_id
      ORDER BY u.name;
    `);

    res.json(result.rows);

  } catch (err) {
    console.error("GET DOCTORS ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get one doctor
exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `
      SELECT
        d.*,
        u.name,
        u.email,
        dep.name AS department
      FROM doctors d
      JOIN users u ON d.user_id=u.id
      LEFT JOIN departments dep
      ON dep.id=d.department_id
      WHERE d.id=$1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add doctor
const bcrypt = require("bcryptjs");

exports.addDoctor = async (req, res) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const {
      name,
      email,
      password,
      department_id,
      specialization,
      qualification,
      experience,
    } = req.body;

    // Check email
    const check = await client.query(
      "SELECT id FROM users WHERE email=$1",
      [email]
    );

    if (check.rows.length > 0) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

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
      ($1,$2,$3,'doctor')
      RETURNING id;
      `,
      [name, email, hashedPassword]
    );

    const userId = userResult.rows[0].id;

    // Create doctor
    await client.query(
      `
      INSERT INTO doctors
      (
        user_id,
        department_id,
        specialization,
        qualification,
        experience
      )
      VALUES
      ($1,$2,$3,$4,$5);
      `,
      [
        userId,
        department_id,
        specialization,
        qualification,
        experience,
      ]
    );

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
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

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      department_id,
      specialization,
      qualification,
      experience,
    } = req.body;

    const result = await db.query(
      `
      UPDATE doctors
      SET
        department_id = $1,
        specialization = $2,
        qualification = $3,
        experience = $4
      WHERE id = $5
      RETURNING *;
      `,
      [
        department_id,
        specialization,
        qualification,
        experience,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      message: "Doctor updated successfully",
      doctor: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {

  try {

    const { id } = req.params;

    const doctor = await db.query(
      "SELECT user_id FROM doctors WHERE id=$1",
      [id]
    );

    if (doctor.rows.length === 0) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    await db.query(
      "DELETE FROM users WHERE id=$1",
      [doctor.rows[0].user_id]
    );

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });

  } catch (err) {

    res.status(500).json(err);

  }

};