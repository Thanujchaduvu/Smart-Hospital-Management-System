import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../../api/axios"

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
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
        "/auth/register",
        formData
      )

      alert(res.data.message)

      navigate("/")

    }

    catch (err) {

      console.log(err)

      alert("Registration Failed")

    }

  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Register
          </button>

          <p style={styles.text}>

            Already have an account?

            <Link
              to="/"
              style={styles.link}
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>

  )

}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#111827,#312e81,#2563eb)"
  },

  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    color: "white"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "35px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px"
  },

  button: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#38bdf8",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  text: {
    textAlign: "center"
  },

  link: {
    color: "#38bdf8",
    marginLeft: "5px",
    textDecoration: "none",
    fontWeight: "bold"
  }

}

export default Register