const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes"))

app.use(
  "/api/appointments",
  require("./routes/appointmentRoutes")
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

app.use(
  "/api/history",
  require("./routes/historyRoutes")
)

const adminRoutes =
require("./routes/adminRoutes")

app.use(
  "/api/admin",
  adminRoutes
)
const medicalRoutes =
require("./routes/medicalRoutes")

app.use(
  "/api/medical",
  medicalRoutes
)

const doctorRoutes =
require("./routes/doctorRoutes")

app.use(
  "/api/doctor",
  doctorRoutes
)

const appointmentRoutes =
require("./routes/appointmentRoutes")

app.use(
  "/api/appointments",
  appointmentRoutes
)

const reportRoutes =
require("./routes/reportRoutes")

app.use(
  "/api/reports",
  reportRoutes
)

app.use(
  "/uploads",
  express.static("uploads")
)

const testRoutes =
require("./routes/testRoutes")

app.use(
  "/api/tests",
  testRoutes
)

const paymentRoutes =
require("./routes/paymentRoutes")

app.use(
  "/api/payment",
  paymentRoutes
)