const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

const {
  getSummary,
  getStatusReport,
  getDepartmentReport,
  getMonthlyReport,
  getRecentAppointments,
} = require("../controllers/reportController");

router.get(
  "/summary",
  verifyToken,
  verifyRole("admin"),
  getSummary
);

router.get(
  "/status",
  verifyToken,
  verifyRole("admin"),
  getStatusReport
);

router.get(
  "/departments",
  verifyToken,
  verifyRole("admin"),
  getDepartmentReport
);

router.get(
  "/monthly",
  verifyToken,
  verifyRole("admin"),
  getMonthlyReport
);

router.get(
  "/recent",
  verifyToken,
  verifyRole("admin"),
  getRecentAppointments
);

module.exports = router;