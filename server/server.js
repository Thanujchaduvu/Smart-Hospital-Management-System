const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
)

app.use(
  "/api/appointments",
  require("./routes/appointmentRoutes")
)

app.use(
  "/api/history",
  require("./routes/historyRoutes")
)

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
)

app.use(
  "/api/medical",
  require("./routes/medicalRoutes")
)

app.use(
  "/api/doctor",
  require("./routes/doctorRoutes")
)

app.use(
  "/api/reports",
  require("./routes/reportRoutes")
)

app.use(
  "/api/tests",
  require("./routes/testRoutes")
)

app.use(
  "/api/payment",
  require("./routes/paymentRoutes")
)

// Static folder for uploaded reports
app.use(
  "/uploads",
  express.static("uploads")
)

// Health Check Route
app.get("/", (req, res) => {
  res.send("AI Hospital Backend Running 🚀")
})

// Start Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})