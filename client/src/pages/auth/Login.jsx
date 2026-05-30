import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../../api/axios"
import {
  signInWithPopup
}
from "firebase/auth"

import {
  auth,
  provider
}
from "../../firebase"
function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await API.post(
        "/auth/login",
        formData
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      localStorage.setItem(
        "role",
        res.data.role
      )

      localStorage.setItem(
        "doctorEmail",
        formData.email
    )

      if (res.data.role === "admin") {
        navigate("/admin")
      }

      else if (res.data.role === "doctor") {
        navigate("/doctor")
      }

      else {
        navigate("/patient")
      }

    }

    catch (err) {

      alert("Login Failed")

    }

  }

const handleGoogleLogin =
async () => {

  try {

    const result =
      await signInWithPopup(
        auth,
        provider
      )

    const user =
      result.user

    await API.post(
      "/auth/google-login",
      {
        name:
          user.displayName,

        email:
          user.email
      }
    )

    localStorage.setItem(
      "token",
      "google-login"
    )

    localStorage.setItem(
      "role",
      "patient"
    )

    navigate("/patient")

  }

  catch (err) {

    console.log(err)

  }

}

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl rounded-3xl p-10">

          <div className="text-center mb-10">

            <h1 className="text-5xl font-bold text-white mb-3">
              AI Hospital
            </h1>

            <p className="text-slate-300">
              Smart Healthcare Platform
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-300 outline-none focus:border-blue-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-300 outline-none focus:border-blue-400"
            />

            <button
              type="submit"
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-105 transition"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full p-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition"
            >
              Continue with Google
            </button>

          </form>

          <p className="text-center text-slate-300 mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-cyan-400 ml-2 font-semibold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  )

}

export default Login
