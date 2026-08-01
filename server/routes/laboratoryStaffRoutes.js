const express = require("express");
const router = express.Router();

const {
  getLaboratoryStaff,
  getLaboratoryStaffById,
  addLaboratoryStaff,
  updateLaboratoryStaff,
  deleteLaboratoryStaff,
} = require("../controllers/laboratoryStaffController");

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

// Get all staff
router.get(
  "/",
  verifyToken,
  verifyRole("admin"),
  getLaboratoryStaff
);

// Get one staff member
router.get(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  getLaboratoryStaffById
);

// Add staff
router.post(
  "/",
  verifyToken,
  verifyRole("admin"),
  addLaboratoryStaff
);

// Update staff
router.put(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  updateLaboratoryStaff
);

// Delete staff
router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  deleteLaboratoryStaff
);

module.exports = router;