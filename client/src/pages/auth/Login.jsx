import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const redirectUser = (role) => {
    switch (role) {
  case "admin":
    navigate("/admin/dashboard");
    break;

  case "doctor":
    navigate("/doctor/dashboard");
    break;

  case "patient":
    navigate("/patient/dashboard");
    break;

  case "laboratory":
    navigate("/laboratory/dashboard");
    break;

  case "pharmacy":
    navigate("/pharmacy/dashboard");
    break;

  default:
    navigate("/");
}}

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      localStorage.setItem("role", res.data.user.role);

      alert(res.data.message);

      redirectUser(res.data.user.role);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    }

    setLoading(false);
  };

  // Google Login
  const handleGoogleSuccess = async (
    credentialResponse
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          credential: credentialResponse.credential,
        }
      );

      // Debug
      console.log("Google Response:", res.data);
      console.log("User:", res.data.user);
      console.log("Role:", res.data.user.role);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      localStorage.setItem(
        "role",
        res.data.user.role
      );

      alert("Google Login Successful");

      redirectUser(res.data.user.role);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Google Login Failed"
      );
    }
  };

  // Google Login Error
  const handleGoogleError = () => {
    console.error("Google Login Failed");
    alert("Google Login Failed");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      }}
    >
      <div
        style={{
          width: "430px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          padding: "35px",
          borderRadius: "20px",
          color: "#fff",
          boxShadow:
            "0 0 25px rgba(0,0,0,.35)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          🏥 AI Hospital
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#ddd",
            marginBottom: "30px",
          }}
        >
          Smart Healthcare Platform
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              marginBottom: "15px",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />

          <div style={{ position: "relative" }}>
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={{
                position: "absolute",
                right: "10px",
                top: "12px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          <div
            style={{
              textAlign: "right",
              marginTop: "10px",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                color: "#00d4ff",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#1e90ff",
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            margin: "25px 0",
          }}
        >
          ───────── OR ─────────
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_blue"
            size="large"
            shape="pill"
            width="350"
          />
        </div>

        <button
          type="button"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "#000",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          🍎 Continue with Apple
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#ddd",
            marginTop: "10px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#00d4ff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}