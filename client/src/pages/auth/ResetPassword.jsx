import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {

      setError(
        err.response?.data?.message || "Something went wrong"
      );

    }

    setLoading(false);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded-lg mb-4"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-lg mb-4"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <button
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

        {message && (
          <p className="text-green-600 mt-4">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 mt-4">
            {error}
          </p>
        )}

      </div>

    </div>
  );
};

export default ResetPassword;