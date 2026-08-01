const db = require("../config/db");

// ========================================
// GET ALL LABORATORY STAFF
// ========================================

exports.getLaboratoryStaff = async (req, res) => {

  try {

    const result = await db.query(`
      SELECT
        l.id,
        l.employee_id,
        l.qualification,
        l.experience,
        l.phone,

        u.name,
        u.email

      FROM laboratories l

      JOIN users u
      ON l.user_id = u.id

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
      message: "Failed to fetch laboratory staff",
    });

  }

};

// ========================================
// GET SINGLE LAB STAFF
// ========================================

exports.getLaboratoryStaffById = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await db.query(
      `
      SELECT
        l.*,
        u.name,
        u.email

      FROM laboratories l

      JOIN users u
      ON l.user_id=u.id

      WHERE l.id=$1;
      `,
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Laboratory staff not found",
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

const bcrypt = require("bcryptjs");

// ========================================
// ADD LABORATORY STAFF
// ========================================

exports.addLaboratoryStaff = async (req, res) => {

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

    // Check existing email
    const checkEmail = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (checkEmail.rows.length > 0) {

      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });

    }

    // Check employee id
    const checkEmployee = await client.query(
      "SELECT id FROM laboratories WHERE employee_id = $1",
      [employee_id]
    );

    if (checkEmployee.rows.length > 0) {

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
      ($1,$2,$3,'laboratory')
      RETURNING id;
      `,
      [
        name,
        email,
        hashedPassword,
      ]
    );

    const userId = userResult.rows[0].id;

    // Create laboratory staff
    const labResult = await client.query(
      `
      INSERT INTO laboratories
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
      message: "Laboratory staff added successfully",
      data: labResult.rows[0],
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
// UPDATE LABORATORY STAFF
// ========================================

exports.updateLaboratoryStaff = async (req, res) => {

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

    // Find laboratory staff
    const lab = await client.query(
      `
      SELECT user_id
      FROM laboratories
      WHERE id=$1;
      `,
      [id]
    );

    if (lab.rows.length === 0) {

      await client.query("ROLLBACK");

      return res.status(404).json({
        success:false,
        message:"Laboratory staff not found",
      });

    }

    const userId = lab.rows[0].user_id;

    // Update user
    await client.query(
      `
      UPDATE users
      SET
        name=$1,
        email=$2
      WHERE id=$3;
      `,
      [
        name,
        email,
        userId,
      ]
    );

    // Update laboratory details
    const result = await client.query(
      `
      UPDATE laboratories
      SET
        employee_id=$1,
        qualification=$2,
        experience=$3,
        phone=$4
      WHERE id=$5
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
      success:true,
      message:"Laboratory staff updated successfully",
      data:result.rows[0],
    });

  } catch(err){

    await client.query("ROLLBACK");

    console.error(err);

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  } finally{

    client.release();

  }

};

// ========================================
// DELETE LABORATORY STAFF
// ========================================

exports.deleteLaboratoryStaff = async (req,res)=>{

  try{

    const { id } = req.params;

    const staff = await db.query(
      `
      SELECT user_id
      FROM laboratories
      WHERE id=$1;
      `,
      [id]
    );

    if(staff.rows.length===0){

      return res.status(404).json({
        success:false,
        message:"Laboratory staff not found",
      });

    }

    // Deleting the user also removes the laboratory record
    // because of ON DELETE CASCADE.
    await db.query(
      `
      DELETE FROM users
      WHERE id=$1;
      `,
      [staff.rows[0].user_id]
    );

    res.json({
      success:true,
      message:"Laboratory staff deleted successfully",
    });

  }catch(err){

    console.error(err);

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  }

};