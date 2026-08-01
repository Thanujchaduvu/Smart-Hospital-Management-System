const db = require("../config/db");

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM departments ORDER BY id ASC"
    );

    res.status(200).json({
      success: true,
      departments: result.rows,
    });
  } catch (err) {
    console.error("Get Departments Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get single department
exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM departments WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      department: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Add department
exports.addDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exists = await db.query(
      "SELECT * FROM departments WHERE name=$1",
      [name]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Department already exists",
      });
    }

    const result = await db.query(
      `INSERT INTO departments(name,description)
       VALUES($1,$2)
       RETURNING *`,
      [name, description]
    );

    res.status(201).json({
      success: true,
      message: "Department added successfully",
      department: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update department
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await db.query(
      `UPDATE departments
       SET name=$1,
           description=$2
       WHERE id=$3
       RETURNING *`,
      [name, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM departments WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};