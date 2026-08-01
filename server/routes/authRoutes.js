const express = require("express");

const router = express.Router();

const {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
} = require("../controllers/authController");

// ================= AUTH =================

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Google Login
router.post("/google-login", googleLogin);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// ================= USERS =================

// Get All Users
router.get("/users", getUsers);

// Delete User
router.delete("/users/:id", deleteUser);

module.exports = router;