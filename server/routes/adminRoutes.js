const express = require("express");
const router = express.Router();

const db = require("../config/db");

const {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  dashboardStats,
} = require("../controllers/adminController");

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");

// ================= DASHBOARD =================

router.get(
  "/dashboard",
  verifyToken,
  verifyRole("admin"),
  dashboardStats
);

// ================= STAFF =================

// Create Staff
router.post(
  "/staff",
  verifyToken,
  verifyRole("admin"),
  createStaff
);

// Get All Staff
router.get(
  "/staff",
  verifyToken,
  verifyRole("admin"),
  getAllStaff
);

// Get Staff By ID
router.get(
  "/staff/:id",
  verifyToken,
  verifyRole("admin"),
  getStaffById
);

// Update Staff
router.put(
  "/staff/:id",
  verifyToken,
  verifyRole("admin"),
  updateStaff
);

// Delete Staff
router.delete(
  "/staff/:id",
  verifyToken,
  verifyRole("admin"),
  deleteStaff
);

// ================= DEPARTMENTS =================

// Get All Departments
router.get(
  "/departments",
  verifyToken,
  verifyRole("admin"),
  async (req, res) => {
    try {
      const result = await db.query(
        "SELECT * FROM departments ORDER BY name"
      );

      res.json(result.rows);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: "Failed to fetch departments",
      });
    }
  }
);

module.exports = router;