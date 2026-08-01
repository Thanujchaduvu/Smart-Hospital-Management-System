const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

const {
  getDashboard,
  getAppointments,
  bookAppointment,
  getMedicalHistory,
  getPrescriptions,
  getLabReports,
  getBills,
  getNotifications,
  getProfile,
  updateProfile,
} = require("../controllers/patientController");

// ================= Dashboard =================
router.get(
  "/dashboard",
  verifyToken,
  verifyRole("patient"),
  getDashboard
);

// ================= Appointments =================
router.get(
  "/appointments",
  verifyToken,
  verifyRole("patient"),
  getAppointments
);

router.post(
  "/appointments/book",
  verifyToken,
  verifyRole("patient"),
  bookAppointment
);

// ================= Medical History =================
router.get(
  "/medical-history",
  verifyToken,
  verifyRole("patient"),
  getMedicalHistory
);

// ================= Prescriptions =================
router.get(
  "/prescriptions",
  verifyToken,
  verifyRole("patient"),
  getPrescriptions
);

// ================= Lab Reports =================
router.get(
  "/lab-reports",
  verifyToken,
  verifyRole("patient"),
  getLabReports
);

// ================= Bills =================
router.get(
  "/bills",
  verifyToken,
  verifyRole("patient"),
  getBills
);

// ================= Notifications =================
router.get(
  "/notifications",
  verifyToken,
  verifyRole("patient"),
  getNotifications
);

// ================= Profile =================
router.get(
  "/profile",
  verifyToken,
  verifyRole("patient"),
  getProfile
);

router.put(
  "/profile",
  verifyToken,
  verifyRole("patient"),
  updateProfile
);

module.exports = router;