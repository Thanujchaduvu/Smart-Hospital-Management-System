const express = require("express");
const router = express.Router();

const {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill,
  getBillingSummary,
  getMonthlyRevenue,
  getAppointmentsForBilling,
} = require("../controllers/billingController");

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

// ==============================
// BILLING DASHBOARD
// ==============================

router.get(
  "/summary",
  verifyToken,
  verifyRole("admin"),
  getBillingSummary
);

router.get(
  "/monthly",
  verifyToken,
  verifyRole("admin"),
  getMonthlyRevenue
);

router.get(
  "/appointments",
  verifyToken,
  verifyRole("admin"),
  getAppointmentsForBilling
);

// ==============================
// BILL CRUD
// ==============================

router.get(
  "/",
  verifyToken,
  verifyRole("admin"),
  getAllBills
);

router.get(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  getBillById
);

router.post(
  "/",
  verifyToken,
  verifyRole("admin"),
  createBill
);

router.put(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  updateBill
);

router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  deleteBill
);

module.exports = router;