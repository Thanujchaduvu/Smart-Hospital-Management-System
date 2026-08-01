const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/email");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// =========================================
// REGISTER
// =========================================

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Only patients can self-register
    const userRole = role === "patient" ? "patient" : "patient";

    // Check if email exists
    const checkUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        role
      )
      VALUES
      ($1,$2,$3,$4)
      RETURNING id,name,email,role
      `,
      [
        name,
        email,
        hashedPassword,
        userRole,
      ]
    );

    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user,
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// LOGIN
// =========================================

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = result.rows[0];

    // Google-only account
    if (user.password === "google-auth") {
      return res.status(400).json({
        success: false,
        message:
          "Please login using Google Sign-In.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// =========================================
// GOOGLE LOGIN
// =========================================

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required.",
      });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const name = payload.name;
    const email = payload.email;

    // Check if user already exists
    const checkUser = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    let user;

    if (checkUser.rows.length > 0) {
      user = checkUser.rows[0];
    } else {
      // Create patient account
      const result = await db.query(
        `
        INSERT INTO users
        (
          name,
          email,
          password,
          role
        )
        VALUES
        ($1,$2,$3,$4)
        RETURNING *
        `,
        [
          name,
          email,
          "google-auth",
          "patient",
        ]
      );

      user = result.rows[0];
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error("Google Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Google Login Failed",
    });
  }
};

// =========================================
// FORGOT PASSWORD
// =========================================

exports.forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = result.rows[0];

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    const expiry = new Date(
      Date.now() + 60 * 60 * 1000
    );

    await db.query(
      `
      UPDATE users
      SET
      reset_token=$1,
      reset_token_expiry=$2
      WHERE id=$3
      `,
      [
        resetToken,
        expiry,
        user.id,
      ]
    );

    const resetLink =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: user.email,

      subject: "Reset Your AI Hospital Password",

      html: `
      <div style="font-family:Arial;padding:30px">

      <h2>🏥 AI Hospital</h2>

      <p>Hello <b>${user.name}</b>,</p>

      <p>You requested to reset your password.</p>

      <p>

      <a
      href="${resetLink}"
      style="
      background:#2563eb;
      color:white;
      padding:12px 20px;
      text-decoration:none;
      border-radius:6px;
      display:inline-block;
      ">
      Reset Password
      </a>

      </p>

      <p>This link expires in <b>1 hour</b>.</p>

      <p>If you didn't request this reset, ignore this email.</p>

      <br>

      <p>AI Hospital Team</p>

      </div>
      `,
    });

    res.json({
      success: true,
      message: "Password reset link sent successfully.",
    });

  } catch (error) {

    console.error("Forgot Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// RESET PASSWORD
// =========================================

exports.resetPassword = async (req, res) => {

  try {

    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const result = await db.query(
      `
      SELECT *
      FROM users
      WHERE reset_token=$1
      AND reset_token_expiry > NOW()
      `,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link.",
      });
    }

    const user = result.rows[0];

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await db.query(
      `
      UPDATE users
      SET
      password=$1,
      reset_token=NULL,
      reset_token_expiry=NULL
      WHERE id=$2
      `,
      [
        hashedPassword,
        user.id,
      ]
    );

    res.json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (error) {

    console.error("Reset Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// =========================================
// GET ALL USERS
// =========================================

exports.getUsers = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT
        id,
        name,
        email,
        role
      FROM users
      ORDER BY id ASC
      `
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      users: result.rows,
    });

  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// GET USER BY ID
// =========================================

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `
      SELECT
        id,
        name,
        email,
        role
      FROM users
      WHERE id=$1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Get User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// UPDATE USER
// =========================================

exports.updateUser = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, email, role } = req.body;

    const checkUser = await db.query(
      "SELECT * FROM users WHERE id=$1",
      [id]
    );

    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const result = await db.query(
      `
      UPDATE users
      SET
      name=$1,
      email=$2,
      role=$3
      WHERE id=$4
      RETURNING
      id,
      name,
      email,
      role
      `,
      [
        name,
        email,
        role,
        id,
      ]
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Update User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// DELETE USER
// =========================================

exports.deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    const checkUser = await db.query(
      "SELECT * FROM users WHERE id=$1",
      [id]
    );

    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await db.query(
      "DELETE FROM users WHERE id=$1",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });

  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// GET LOGGED-IN USER PROFILE
// =========================================

exports.getProfile = async (req, res) => {
  try {

    const result = await db.query(
      `
      SELECT
        id,
        name,
        email,
        role
      FROM users
      WHERE id=$1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};