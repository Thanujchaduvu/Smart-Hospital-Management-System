const express = require("express");
const router = express.Router();

const {
  getPharmacyStaff,
  getPharmacyStaffById,
  addPharmacyStaff,
  updatePharmacyStaff,
  deletePharmacyStaff,
} = require("../controllers/pharmacyStaffController");

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

// Get all pharmacy staff
router.get(
  "/",
  verifyToken,
  verifyRole("admin"),
  getPharmacyStaff
);

// Get one pharmacy staff
router.get(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  getPharmacyStaffById
);

// Add pharmacy staff
router.post(
  "/",
  verifyToken,
  verifyRole("admin"),
  addPharmacyStaff
);

// Update pharmacy staff
router.put(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  updatePharmacyStaff
);

// Delete pharmacy staff
router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  deletePharmacyStaff
);

module.exports = router;