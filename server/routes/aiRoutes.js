const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { chatWithAI } = require("../controllers/aiController");

// ===============================
// AI Health Assistant Chat
// ===============================
router.post(
  "/chat",
  verifyToken,
  chatWithAI
);

module.exports = router;