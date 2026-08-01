const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

const {
  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

// Get all doctors
router.get(
  "/",
  verifyToken,
  getDoctors
);

// Get doctor by ID
router.get(
  "/:id",
  verifyToken,
  getDoctorById
);

// Add doctor (Admin only)
router.post(
  "/",
  verifyToken,
  verifyRole("admin"),
  addDoctor
);

// Update doctor (Admin only)
router.put(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  updateDoctor
);

// Delete doctor (Admin only)
router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  deleteDoctor
);

module.exports = router;