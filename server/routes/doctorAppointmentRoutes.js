const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

const {
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("../controllers/doctorAppointmentController");

// Get logged-in doctor's appointments
router.get(
  "/",
  verifyToken,
  verifyRole("doctor"),
  getDoctorAppointments
);

// Update appointment status
router.put(
  "/:id",
  verifyToken,
  verifyRole("doctor"),
  updateAppointmentStatus
);

module.exports = router;