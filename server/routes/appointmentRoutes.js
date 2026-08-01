const express = require("express");
const router = express.Router();

const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

router.get(
  "/",
  verifyToken,
  verifyRole("admin"),
  getAppointments
);

router.post(
  "/",
  verifyToken,
  verifyRole("admin"),
  createAppointment
);

router.put(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  updateAppointment
);

router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  deleteAppointment
);

module.exports = router;