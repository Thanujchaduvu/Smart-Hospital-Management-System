const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

const {
  bookAppointment,
  getMyAppointments,
} = require("../controllers/patientAppointmentController");

router.post(
  "/",
  verifyToken,
  verifyRole("patient"),
  bookAppointment
);

router.get(
  "/",
  verifyToken,
  verifyRole("patient"),
  getMyAppointments
);

module.exports = router;