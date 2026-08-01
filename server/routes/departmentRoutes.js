const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

const {
  getDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

// Get all departments
router.get(
  "/",
  verifyToken,
  getDepartments
);

// Get single department
router.get(
  "/:id",
  verifyToken,
  getDepartmentById
);

// Add department (Admin only)
router.post(
  "/",
  verifyToken,
  verifyRole("admin"),
  addDepartment
);

// Update department (Admin only)
router.put(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  updateDepartment
);

// Delete department (Admin only)
router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  deleteDepartment
);

module.exports = router;